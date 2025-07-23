'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import FloatingBackground from '@/components/ui/FloatingBackground';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Copy, 
  Mail, 
  RefreshCw, 
  Trash2, 
  Zap,
  AlertCircle,
  CheckCircle,
  Send,
  Inbox,
  Timer,
  Activity
} from 'lucide-react';
import { event as gtag } from '@/lib/gtag';

interface Message {
  id: string;
  from: string;
  subject: string;
  received_at: string;
  preview: string;
  body_text: string;
  body_html: string;
}

interface TempMailState {
  email: string | null;
  createdAt: Date | null;
  expiresAt: Date | null;
  messages: Message[];
  isActive: boolean;
  timeRemaining: number;
}

const TEMP_MAIL_DURATION = 5 * 60; // 5 minutes
const REFRESH_COOLDOWN = 10 * 1000; // 10 seconds cooldown

export default function TempMailPage() {
  const { user } = useUser();
  
  const [state, setState] = useState<TempMailState>({
    email: null,
    createdAt: null,
    expiresAt: null,
    messages: [],
    isActive: false,
    timeRemaining: 0,
  });
  
  const [generating, setGenerating] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);

  // Analytics tracking
  const trackEvent = useCallback((eventName: string, metadata?: Record<string, any>) => {
    gtag({
      action: eventName,
      category: 'temp_mail',
      label: metadata ? JSON.stringify(metadata).slice(0, 100) : undefined,
    });
  }, []);

  // Track page view
  useEffect(() => {
    trackEvent('page_view', {
      user_authenticated: !!user,
      user_name: user?.name,
    });
  }, [trackEvent, user]);

  // Format time remaining as MM:SS
  const formatTimeRemaining = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Update countdown timer
  useEffect(() => {
    if (!state.isActive || !state.expiresAt) return;

    const interval = setInterval(() => {
      const now = new Date();
      const remaining = Math.max(0, Math.floor((state.expiresAt!.getTime() - now.getTime()) / 1000));
      
      setState(prev => ({ ...prev, timeRemaining: remaining }));

      if (remaining <= 0) {
        setState(prev => ({
          ...prev,
          isActive: false,
          timeRemaining: 0,
        }));
        trackEvent('email_expired', { email_domain: state.email?.split('@')[1] });
        toast.info('⏰ Temp email expired');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.isActive, state.expiresAt, state.email, trackEvent]);

  // Manual refresh messages with cooldown
  const refreshMessages = useCallback(async () => {
    if (!state.email || !state.isActive || refreshing) return;

    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshTime;
    
    if (timeSinceLastRefresh < REFRESH_COOLDOWN) {
      const remainingTime = Math.ceil((REFRESH_COOLDOWN - timeSinceLastRefresh) / 1000);
      toast.warning(`⏱️ Please wait ${remainingTime} seconds before refreshing again`);
      return;
    }

    setRefreshing(true);
    setLastRefreshTime(now);
    
    try {
      const response = await fetch('/api/demo/temp-mail/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: state.email
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        const newMessages = data.data.messages || [];
        setState(prev => {
          const oldCount = prev.messages.length;
          const newCount = newMessages.length;
          
          if (newCount > oldCount) {
            const newEmailsCount = newCount - oldCount;
            trackEvent('new_messages_received', {
              count: newEmailsCount,
              total_messages: newCount,
              email_domain: state.email?.split('@')[1],
            });
            toast.success(`📧 Found ${newEmailsCount} new message(s)!`);
          } else if (newCount === oldCount && oldCount === 0) {
            toast.info('📭 No new messages');
          }
          
          return {
            ...prev,
            messages: newMessages
          };
        });
        
        trackEvent('manual_refresh_success', {
          message_count: newMessages.length,
          email_domain: state.email?.split('@')[1],
        });
      } else {
        toast.error('Failed to refresh messages');
        trackEvent('manual_refresh_failed', { error: data.message });
      }
    } catch (error) {
      console.error('Failed to refresh messages:', error);
      toast.error('Failed to refresh messages');
      trackEvent('manual_refresh_error', { error: String(error) });
    } finally {
      setRefreshing(false);
    }
  }, [state.email, state.isActive, refreshing, lastRefreshTime, trackEvent]);


  // Generate new temp email
  const generateTempEmail = async () => {
    setGenerating(true);
    trackEvent('generate_email_attempt');
    
    try {
      const response = await fetch('/api/demo/temp-mail/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success && data.data?.email) {
        const now = new Date();
        const expiresAt = new Date(now.getTime() + TEMP_MAIL_DURATION * 1000);
        
        setState({
          email: data.data.email,
          createdAt: now,
          expiresAt: expiresAt,
          messages: [],
          isActive: true,
          timeRemaining: TEMP_MAIL_DURATION,
        });

        trackEvent('email_generated_success', {
          email_domain: data.data.email.split('@')[1],
          expires_at: expiresAt.toISOString(),
        });
        
        toast.info('📬 Click refresh button to check for new messages');
      } else {
        trackEvent('email_generation_failed', { error: data.message });
        toast.error(data.message || 'Failed to generate email');
      }
    } catch (error) {
      trackEvent('email_generation_error', { error: String(error) });
      toast.error('Failed to generate email');
    } finally {
      setGenerating(false);
    }
  };

  // Copy email to clipboard with visual feedback (for Email Generator card - no toast)
  const copyEmailSilent = async () => {
    if (state.email) {
      try {
        await navigator.clipboard.writeText(state.email);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2000);
        
        trackEvent('email_copied', { email_domain: state.email.split('@')[1] });
      } catch (error) {
        trackEvent('copy_failed', { error: String(error) });
      }
    }
  };

  // Copy email to clipboard with toast notification (for action buttons)
  const copyEmail = async () => {
    if (state.email) {
      try {
        await navigator.clipboard.writeText(state.email);
        trackEvent('email_copied', { email_domain: state.email.split('@')[1] });
        toast.success('📋 Email copied to clipboard!');
      } catch (error) {
        trackEvent('copy_failed', { error: String(error) });
        toast.error('Failed to copy email');
      }
    }
  };

  // Destroy current email
  const destroyEmail = () => {
    trackEvent('email_destroyed_manually', { 
      email_domain: state.email?.split('@')[1],
      time_remaining: state.timeRemaining 
    });
    
    setState({
      email: null,
      createdAt: null,
      expiresAt: null,
      messages: [],
      isActive: false,
      timeRemaining: 0,
    });
    setSelectedMessage(null);
    toast.success('🗑️ Temp email destroyed');
  };

  const getStatusColor = () => {
    if (!state.isActive) return 'text-gray-500';
    if (state.timeRemaining <= 60) return 'text-red-500';
    return 'text-green-500';
  };

  const getStatusIcon = () => {
    if (!state.isActive) return <AlertCircle className="h-4 w-4" />;
    if (state.timeRemaining <= 60) return <AlertCircle className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Header */}
      <Navbar />
      
      {/* Enhanced Hero Section with Purple Background */}
      <div className="relative isolate overflow-hidden -mt-20 pt-36 pb-8 sm:pt-38 sm:pb-10 lg:pt-40 lg:pb-16">
        {/* Background Pattern - consistent with API catalog */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07AAFF] to-purple-600">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating Background with project's design */}
        <FloatingBackground 
          variant="hero" 
          includeBlurElements={true}
          includeFloatingBubbles={true}
          includeSparkles={true}
        />

        {/* Hero Content */}
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/80 to-cyan-500/80 text-white px-6 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Activity className="h-4 w-4" />
              JuheAPI Demo
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-slide-up">
              Temp Mail
            </h1>
            
            <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Generate disposable email addresses instantly. 
              Perfect for privacy protection.
            </p>
          </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 -mt-32">
        <div className="container mx-auto px-4 pb-16">

          {/* Main Interface */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Email Generator Card */}
              <div className="lg:col-span-1">
                <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 animate-scale-in min-h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      Email Generator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 flex-1 flex flex-col">
                    {state.email ? (
                      <div className="space-y-4">
                        {/* Email Display */}
                        <div className="relative group">
                          <Input
                            value={state.email}
                            readOnly
                            className="font-mono text-sm bg-white/50 border-2 border-blue-200/50 focus:border-blue-400 transition-all duration-200"
                          />
                          <Button
                            onClick={copyEmailSilent}
                            size="sm"
                            variant="ghost"
                            className={`absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 p-0 transition-all duration-200 ${
                              copyFeedback 
                                ? 'bg-green-100 text-green-600 scale-110' 
                                : 'hover:bg-blue-100 text-blue-600'
                            }`}
                          >
                            <Copy className={`h-4 w-4 ${copyFeedback ? 'animate-bounce' : ''}`} />
                          </Button>
                          {copyFeedback && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded animate-fade-in">
                              Copied!
                            </div>
                          )}
                        </div>
                        
                        {/* Status Indicator */}
                        <div className={`flex items-center gap-2 text-sm ${getStatusColor()}`}>
                          {getStatusIcon()}
                          {state.isActive ? (
                            <span>Active - {formatTimeRemaining(state.timeRemaining)} remaining</span>
                          ) : (
                            <span>Expired</span>
                          )}
                        </div>
                        
                        {/* Progress Bar */}
                        {state.isActive && (
                          <div className="space-y-3">
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  state.timeRemaining <= 60 
                                    ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                                    : 'bg-gradient-to-r from-green-500 to-blue-500'
                                }`}
                                style={{ 
                                  width: `${(state.timeRemaining / TEMP_MAIL_DURATION) * 100}%` 
                                }}
                              />
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <Button
                                onClick={copyEmail}
                                variant="outline"
                                size="sm"
                                className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </Button>
                              <Button
                                onClick={refreshMessages}
                                disabled={refreshing}
                                variant="outline"
                                size="sm"
                                className="hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-200"
                              >
                                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                                {refreshing ? 'Refreshing' : 'Refresh'}
                              </Button>
                              <Button
                                onClick={destroyEmail}
                                variant="outline"
                                size="sm"
                                className="hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center py-12">
                          <div className="p-6 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                            <Mail className="h-12 w-12 text-blue-600" />
                          </div>
                          <p className="text-gray-500 mb-2 font-medium">No active temp email</p>
                          <p className="text-sm text-gray-400">Generate one to start receiving emails</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Generate Button */}
                    <Button
                      onClick={generateTempEmail}
                      disabled={generating || state.isActive}
                      size="lg"
                      className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transition-all duration-300 ${
                        generating ? 'animate-pulse' : 'hover:scale-105'
                      }`}
                    >
                      {generating ? (
                        <>
                          <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : state.isActive ? (
                        <>
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Email Active
                        </>
                      ) : (
                        <>
                          <Zap className="h-5 w-5 mr-2" />
                          Generate Temp Email
                        </>
                      )}
                    </Button>

                    {/* Stats */}
                    {state.email && (
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{state.messages.length}</div>
                          <div className="text-xs text-gray-500">Messages</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {state.isActive ? '🟢' : '🔴'}
                          </div>
                          <div className="text-xs text-gray-500">Status</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Messages Section */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Inbox */}
                  <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl animate-scale-in min-h-[600px] flex flex-col" style={{ animationDelay: '0.1s' }}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-gray-800">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                            <Inbox className="h-5 w-5 text-white" />
                          </div>
                          Inbox ({state.messages.length})
                        </div>
                        {state.isActive && (
                          <Button
                            onClick={refreshMessages}
                            disabled={refreshing}
                            size="sm"
                            variant="outline"
                            className="hover:bg-green-50 hover:border-green-300 hover:text-green-600"
                          >
                            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {state.messages.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center py-12">
                            <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                              <Mail className="h-10 w-10 text-gray-400" />
                            </div>
                            <p className="text-gray-500 mb-2 font-medium">No messages yet</p>
                            {state.email ? (
                              <div className="text-sm text-gray-400 text-center">
                                <p>Send an email to:</p>
                                <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs block mt-2">
                                  {state.email.length > 20 ? `${state.email.substring(0, 20)}...` : state.email}
                                </span>
                                <p className="mt-2">Then click refresh to check for messages</p>
                              </div>
                            ) : (
                              <p className="text-sm text-gray-400">Generate an email first</p>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                          {state.messages.map((message, index) => (
                            <div
                              key={message.id}
                              className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                                selectedMessage?.id === message.id
                                  ? 'border-blue-400 bg-blue-50/80 shadow-lg scale-105'
                                  : 'border-gray-200 hover:bg-white/80 hover:border-gray-300'
                              }`}
                              onClick={() => {
                                setSelectedMessage(message);
                                trackEvent('message_selected', {
                                  message_index: index,
                                  from_domain: message.from.split('@')[1],
                                });
                              }}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="font-medium text-sm truncate flex-1 pr-2">
                                  {message.from}
                                </div>
                                <div className="text-xs text-gray-400 shrink-0">
                                  {new Date(message.received_at).toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </div>
                              </div>
                              <div className="font-semibold text-sm mb-2 text-gray-800 line-clamp-1">
                                {message.subject}
                              </div>
                              <div className="text-xs text-gray-600 line-clamp-2">
                                {message.preview}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Message Details */}
                  <Card className="bg-white/70 backdrop-blur-xl border-white/20 shadow-xl transition-all duration-300 hover:shadow-2xl animate-scale-in min-h-[600px] flex flex-col" style={{ animationDelay: '0.2s' }}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-800">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                          <Send className="h-5 w-5 text-white" />
                        </div>
                        Message Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      {selectedMessage ? (
                        <div className="space-y-4">
                          <div className="border-b border-gray-200 pb-4">
                            <h3 className="font-semibold mb-3 text-gray-800 break-words">
                              {selectedMessage.subject}
                            </h3>
                            <div className="text-sm text-gray-600 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">From:</span> 
                                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono break-all">
                                  {selectedMessage.from}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">Received:</span> 
                                <span className="bg-blue-100 px-2 py-1 rounded text-xs">
                                  {new Date(selectedMessage.received_at).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="max-h-64 overflow-y-auto custom-scrollbar">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <pre className="whitespace-pre-wrap text-sm font-sans break-words text-gray-700">
                                {selectedMessage.body_text}
                              </pre>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 flex items-center justify-center">
                          <div className="text-center py-12">
                            <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                              <Send className="h-10 w-10 text-purple-600" />
                            </div>
                            <p className="text-gray-500 font-medium">Select a message</p>
                            <p className="text-sm text-gray-400">Choose a message from the inbox to view details</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>


          {/* Instructions */}
          <Card className="mt-12 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl border-blue-200/30 shadow-xl animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="text-center text-gray-800">How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Timer className="h-5 w-5 text-blue-600" />
                    Quick Start Guide
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                      <span>Click &quot;Generate Temp Email&quot; to create a temporary email address</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                      <span>Copy the email address and use it on any website</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                      <span>Click the refresh button to check for new messages (minimum 1 minute interval)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</span>
                      <span>Click on any message to view its full content</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Service Features
                  </h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-3">
                      <span className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">⏱️</span>
                      <span>5-minute email lifetime for secure temporary usage (Get API for longer usage)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-green-100 text-green-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">🔄</span>
                      <span>Manual refresh with 1-minute cooldown for optimal performance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">🚫</span>
                      <span>No registration required - completely anonymous service</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="bg-orange-100 text-orange-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">📧</span>
                      <span>Powered by JuheAPI&apos;s reliable temporary email infrastructure</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Custom Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(243 244 246);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(156 163 175);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(107 114 128);
        }
      `}</style>
    </div>
  );
}