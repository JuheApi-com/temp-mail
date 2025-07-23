"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";
import { Input } from "./input";
import { ScrollArea } from "./scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import * as LucideIcons from "lucide-react";

// Helper function to create a display name for icons
const formatIconName = (iconName: string): string => {
  // Split camelCase into words
  const words = iconName.replace(/([A-Z])/g, ' $1').trim();
  
  // Common abbreviations and replacements for shorter display
  const replacements: { [key: string]: string } = {
    'Shopping Cart': 'Cart',
    'Shopping Bag': 'Bag',
    'Trending Up': 'Up↗',
    'Trending Down': 'Down↘',
    'Trending Up Down': 'Trend',
    'Credit Card': 'Card',
    'Dollar Sign': '$',
    'Pound Sterling': '£',
    'Bar Chart': 'Chart',
    'Pie Chart': 'Pie',
    'Line Chart': 'Line',
    'Hand Coins': 'Pay',
    'Bank Note': 'Cash',
    'Land Plot': 'Land',
    'Hand Shake': 'Deal',
    'Message Circle': 'Chat',
    'Message Square': 'Msg',
    'Phone Call': 'Call',
    'User Plus': 'Add',
    'User Minus': 'Remove',
    'User Check': 'Verify',
    'Thumbs Up': '👍',
    'Thumbs Down': '👎',
    'Bell Ring': 'Ring',
    'At Sign': '@',
    'File Text': 'Doc',
    'File Image': 'Img',
    'File Video': 'Video',
    'Folder Open': 'Open',
    'Folder Plus': 'New',
    'Arrow Up': '↑',
    'Arrow Down': '↓',
    'Arrow Left': '←',
    'Arrow Right': '→',
    'Chevron Up': '⌄',
    'Chevron Down': '⌄',
    'Chevron Left': '‹',
    'Chevron Right': '›',
    'More Horizontal': '⋯',
    'More Vertical': '⋮',
    'Hard Drive': 'Drive',
    'Memory Stick': 'USB',
    'Battery Charging': 'Charge',
    'Satellite Dish': 'Dish',
    'Ice Cream': 'Ice',
    'Glass Water': 'Water'
  };

  return replacements[words] || words;
};

// Helper component for highlighting search results
const Highlight = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>;
  }
  
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <strong
            key={i}
            className="font-bold text-white bg-[#6681FC] rounded-sm px-0.5"
          >
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </span>
  );
};

// Complete Lucide Icons List - Organized by Categories, 500+ Icons
const ICON_CATEGORIES = {
  Popular: [
    "Box",
    "Smartphone",
    "Server",
    "Database",
    "Bot",
    "Cloud",
    "Key",
    "User",
    "Activity",
    "Zap",
    "BookOpen",
    "CreditCard",
    "Globe",
    "Lock",
    "Mail",
    "Settings",
    "Shield",
    "Terminal",
    "Monitor",
    "Camera",
    "Map",
    "Package",
    "PieChart",
    "Rocket",
    "ShoppingCart",
    "Wallet",
    "Home",
    "Search",
    "Plus",
    "Minus",
    "Star",
    "Heart",
    "Download",
    "Upload",
    "Edit",
    "Trash2",
    "Check",
    "X",
    "Info",
    "AlertTriangle",
    "CheckCircle",
    "XCircle",
    "Play",
    "Pause",
  ],
  "Devices & Tech": [
    "Smartphone",
    "Tablet",
    "Laptop",
    "Monitor",
    "Tv",
    "Speaker",
    "Headphones",
    "Microphone",
    "Camera",
    "Video",
    "Printer",
    "Scanner",
    "HardDrive",
    "Cpu",
    "MemoryStick",
    "Usb",
    "Wifi",
    "Bluetooth",
    "Router",
    "Server",
    "Database",
    "Cloud",
    "CloudDownload",
    "CloudUpload",
    "Terminal",
    "Code",
    "Bug",
    "Zap",
    "Battery",
    "BatteryCharging",
    "Power",
    "Plug",
    "Keyboard",
    "Mouse",
    "Gamepad2",
    "Joystick",
    "Radio",
    "Tv2",
    "Webcam",
    "Projector",
    "SatelliteDish",
    "Radar",
  ],
  "Business & Finance": [
    "Building",
    "Building2",
    "Store",
    "Factory",
    "Warehouse",
    "ShoppingCart",
    "ShoppingBag",
    "CreditCard",
    "Wallet",
    "Coins",
    "DollarSign",
    "Euro",
    "PoundSterling",
    "Yen",
    "TrendingUp",
    "TrendingDown",
    "BarChart",
    "PieChart",
    "LineChart",
    "Calculator",
    "Receipt",
    "Invoice",
    "Target",
    "Award",
    "Trophy",
    "Briefcase",
    "HandCoins",
    "Banknote",
    "LandPlot",
    "Handshake",
    "Scale",
    "TrendingUpDown",
    "BarChart2",
    "BarChart3",
    "BarChart4",
    "Activity",
  ],
  Communication: [
    "Mail",
    "MailOpen",
    "Send",
    "MessageCircle",
    "MessageSquare",
    "Phone",
    "PhoneCall",
    "Video",
    "Users",
    "User",
    "UserPlus",
    "UserMinus",
    "UserCheck",
    "Share",
    "Share2",
    "ThumbsUp",
    "ThumbsDown",
    "Heart",
    "Star",
    "Bookmark",
    "Flag",
    "Bell",
    "BellRing",
    "AtSign",
    "Hash",
    "Link",
    "ExternalLink",
    "MessageCircleMore",
    "MessageCircleQuestion",
    "MessageCircleX",
    "PhoneIncoming",
    "PhoneOutgoing",
  ],
  "Files & Documents": [
    "File",
    "FileText",
    "FileImage",
    "FileVideo",
    "FileAudio",
    "FilePdf",
    "FileSpreadsheet",
    "FileCode",
    "Folder",
    "FolderOpen",
    "FolderPlus",
    "Archive",
    "Download",
    "Upload",
    "Copy",
    "Clipboard",
    "ClipboardList",
    "BookOpen",
    "Book",
    "Newspaper",
    "FileEdit",
    "FilePlus",
    "FileX",
    "Save",
    "FolderMinus",
    "FolderX",
    "Files",
    "FileArchive",
    "FileBarChart",
    "FileCheck",
    "FileClock",
    "FileDigit",
    "FileDown",
    "FileHeart",
    "FileKey",
    "FileLock",
  ],
  "Navigation & UI": [
    "Home",
    "Menu",
    "MoreHorizontal",
    "MoreVertical",
    "ChevronUp",
    "ChevronDown",
    "ChevronLeft",
    "ChevronRight",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "Navigation",
    "Compass",
    "Map",
    "MapPin",
    "Route",
    "Move",
    "Maximize",
    "Minimize",
    "ZoomIn",
    "ZoomOut",
    "RotateCcw",
    "RotateCw",
    "RefreshCw",
    "ArrowBigUp",
    "ArrowBigDown",
    "ArrowBigLeft",
    "ArrowBigRight",
    "ChevronsUp",
  ],
  "Tools & Utilities": [
    "Settings",
    "Tool",
    "Wrench",
    "Hammer",
    "Screwdriver",
    "Scissors",
    "Ruler",
    "Paintbrush",
    "Palette",
    "Pipette",
    "Crop",
    "Filter",
    "Search",
    "Scan",
    "QrCode",
    "Barcode",
    "Calculator",
    "Calendar",
    "Clock",
    "Timer",
    "Stopwatch",
    "Alarm",
    "Bell",
    "Volume2",
    "VolumeX",
    "Play",
    "Pause",
    "Stop",
    "SkipForward",
  ],
  "Security & Access": [
    "Shield",
    "ShieldCheck",
    "ShieldAlert",
    "Lock",
    "Unlock",
    "Key",
    "KeyRound",
    "Eye",
    "EyeOff",
    "UserCheck",
    "UserX",
    "CheckCircle",
    "XCircle",
    "AlertTriangle",
    "AlertCircle",
    "Info",
    "HelpCircle",
    "Ban",
    "ShieldX",
    "Fingerprint",
    "Scan",
    "ShieldEllipsis",
    "ShieldMinus",
    "ShieldOff",
    "ShieldPlus",
    "ShieldQuestion",
  ],
  "Nature & Weather": [
    "Sun",
    "Moon",
    "Cloud",
    "CloudRain",
    "CloudSnow",
    "CloudLightning",
    "Wind",
    "Thermometer",
    "Droplets",
    "Flame",
    "Snowflake",
    "Umbrella",
    "TreePine",
    "Flower",
    "Leaf",
    "Mountain",
    "Waves",
    "Rainbow",
    "Sunrise",
    "Sunset",
    "CloudDrizzle",
    "CloudFog",
    "CloudHail",
    "CloudMoon",
    "CloudMoonRain",
  ],
  "Travel & Transport": [
    "Car",
    "Truck",
    "Bus",
    "Train",
    "Plane",
    "Ship",
    "Bike",
    "Motorcycle",
    "Fuel",
    "ParkingCircle",
    "Traffic",
    "MapPin",
    "Route",
    "Compass",
    "Navigation",
    "Luggage",
    "Passport",
    "Ticket",
    "Hotel",
    "Tent",
    "Camera",
    "Backpack",
    "CarFront",
    "CarSide",
    "TramFront",
  ],
  "Gaming & Fun": [
    "Gamepad",
    "Gamepad2",
    "Joystick",
    "Dices",
    "Puzzle",
    "Trophy",
    "Medal",
    "Award",
    "Target",
    "Crosshair",
    "Zap",
    "Sparkles",
    "PartyPopper",
    "Gift",
    "GiftCard",
    "Cake",
    "IceCream",
    "Pizza",
    "Coffee",
    "Wine",
    "Beer",
    "Martini",
    "Cherry",
    "Apple",
    "Banana",
  ],
  "Health & Medical": [
    "Heart",
    "HeartPulse",
    "Activity",
    "Stethoscope",
    "Thermometer",
    "Pill",
    "Syringe",
    "Bandage",
    "Cross",
    "Plus",
    "Minus",
    "Zap",
    "Eye",
    "EyeOff",
    "Ear",
    "EarOff",
    "Brain",
    "Bone",
    "Tooth",
    "Footprints",
    "Hand",
    "Fingerprint",
    "Baby",
    "Accessibility",
  ],
  "Food & Drinks": [
    "Coffee",
    "Cup",
    "Wine",
    "Beer",
    "Martini",
    "GlassWater",
    "Milk",
    "IceCream",
    "Pizza",
    "Sandwich",
    "Cookie",
    "Donut",
    "Cake",
    "Cherry",
    "Apple",
    "Banana",
    "Grape",
    "Strawberry",
    "Lemon",
    "Carrot",
    "Corn",
    "Wheat",
    "Egg",
    "Fish",
  ],
};

// 动态获取所有 Lucide 图标名称
const getAllLucideIconNames = (): string[] => {
  return Object.keys(LucideIcons).filter(key => {
    // 过滤掉非图标的导出（如 createLucideIcon, Icon 等工具函数）
    const value = (LucideIcons as any)[key];
    return typeof value === 'function' && 
           key !== 'createLucideIcon' && 
           key !== 'Icon' &&
           key !== 'default' &&
           // 图标名称通常以大写字母开头
           /^[A-Z]/.test(key);
  });
};

// 获取分类图标和所有图标
const ALL_CATEGORY_ICONS = Array.from(new Set(Object.values(ICON_CATEGORIES).flat()));
const ALL_LUCIDE_ICONS = getAllLucideIconNames();

export interface IconPickerProps {
  value?: string;
  onChange: (icon: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Popular");

  const CurrentIcon =
    value && (LucideIcons as any)[value]
      ? (LucideIcons as any)[value]
      : (LucideIcons as any)["Box"];

  // Filter icons
  const filteredIcons = searchTerm
    ? ALL_LUCIDE_ICONS.filter((iconName: string) =>
        iconName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : (ICON_CATEGORIES as any)[selectedCategory] || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 px-4 py-2 border-[#BCD8FC]/50 hover:border-[#6681FC]/50 hover:bg-[#6681FC]/5 transition-all duration-200"
          type="button"
        >
          <CurrentIcon className="w-5 h-5 text-[#6681FC]" />
          <span className="text-sm text-[#39424D]">{value || "Choose Icon"}</span>
          <LucideIcons.ChevronDown className="w-4 h-4 text-[#39424D]/60" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[900px] w-[90vw] h-[85vh] p-0 flex flex-col border-[#BCD8FC]/30 shadow-2xl">
        <DialogHeader className="p-4 border-b border-neutral-200/60">
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-[#39424D]">
            <LucideIcons.Palette className="w-6 h-6 text-[#6681FC]" />
            Choose Application Icon
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar for Categories */}
          <div className="w-48 border-r border-neutral-200/60 flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {Object.keys(ICON_CATEGORIES).map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "secondary" : "ghost"
                    }
                    onClick={() => {
                      setSelectedCategory(category);
                      setSearchTerm("");
                    }}
                    className={`w-full justify-start h-9 px-3 text-sm ${
                      selectedCategory === category
                        ? "font-semibold text-[#6681FC]"
                        : "text-[#39424D]/80"
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b border-neutral-200/60">
              <div className="relative">
                <LucideIcons.Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#39424D]/40" />
                <Input
                  placeholder="Search over 500+ icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-11 text-base border-[#BCD8FC]/30 focus:border-[#6681FC]/50 focus:ring-[#6681FC]/20"
                />
              </div>
            </div>

            {/* Icon Grid */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <TooltipProvider delayDuration={100}>
                  <div className="p-4">
                    {filteredIcons.length > 0 ? (
                      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9 gap-0">
                        {filteredIcons.map((iconName: string) => {
                          const Icon = (LucideIcons as any)[iconName];
                          if (!Icon) return null;

                          return (
                            <Tooltip key={iconName}>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  className={`group flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 hover:bg-[#6681FC]/10 focus:outline-none focus:ring-2 focus:ring-[#6681FC]/30 ${
                                    searchTerm ? 'h-24 w-20' : 'h-16 w-16'
                                  } ${
                                    value === iconName
                                      ? "bg-[#6681FC]/15 ring-2 ring-[#6681FC]/40"
                                      : "hover:bg-[#6681FC]/5"
                                  }`}
                                  onClick={() => {
                                    onChange(iconName);
                                    setOpen(false);
                                  }}
                                >
                                  <Icon
                                    className={`w-6 h-6 shrink-0 transition-colors ${
                                      searchTerm ? 'mb-1' : ''
                                    } ${
                                      value === iconName
                                        ? "text-[#6681FC]"
                                        : "text-[#39424D]/70 group-hover:text-[#6681FC]"
                                    }`}
                                  />
                                  {searchTerm && (
                                    <span className="text-xs text-center leading-none text-[#39424D]/70 group-hover:text-[#39424D] px-1 whitespace-nowrap">
                                      <Highlight
                                        text={iconName}
                                        highlight={searchTerm}
                                      />
                                    </span>
                                  )}
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{iconName}</p>
                              </TooltipContent>
                            </Tooltip>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-[#39424D]/60">
                        <LucideIcons.Search className="w-16 h-16 mb-4" />
                        <p className="text-lg font-medium">No icons found</p>
                        <p className="text-sm text-[#39424D]/40 mt-2">
                          Try using different keywords or changing category.
                        </p>
                      </div>
                    )}
                  </div>
                </TooltipProvider>
              </ScrollArea>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
