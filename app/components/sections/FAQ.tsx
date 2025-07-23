import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto relative">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-3xl"></div>
      
      {/* Floating liquid glass elements */}
      <div className="absolute top-8 right-8 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-cyan-100/10 rounded-full filter blur-xl "></div>
      <div className="absolute top-24 left-12 w-16 h-16 bg-gradient-to-br from-purple-200/15 to-pink-100/10 rounded-full filter blur-lg "></div>
      <div className="absolute bottom-12 right-16 w-18 h-18 bg-gradient-to-br from-cyan-200/20 to-teal-100/10 rounded-full filter blur-xl "></div>
      <div className="absolute top-1/3 right-1/4 w-14 h-14 bg-gradient-to-br from-pink-200/25 to-rose-100/15 rounded-full filter blur-lg "></div>
      <div className="absolute bottom-24 left-8 w-22 h-22 bg-gradient-to-br from-indigo-200/15 to-blue-100/10 rounded-full filter blur-xl "></div>
      
      {/* Floating glass particles */}
      <div className="absolute top-16 left-1/4 w-2 h-2 bg-white/30 backdrop-blur-sm rounded-full "></div>
      <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-white/25 backdrop-blur-sm rounded-full "></div>
      <div className="absolute top-1/2 left-8 w-2 h-2 bg-white/35 backdrop-blur-sm rounded-full "></div>
      
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">FAQ</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our API platform
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto relative z-10">
        <AccordionItem value="item-1" className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/50">
          <AccordionTrigger className="text-gray-800 hover:text-[#07AAFF] px-6 py-4">
            What is Juhe API Marketplace?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 px-6 pb-4">
            Juhe API Marketplace is a platform where you can find, connect, and manage APIs all with a single account 
            and single API key. We make it easy to integrate various APIs into your applications.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2" className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/50">
          <AccordionTrigger className="text-gray-800 hover:text-[#07AAFF] px-6 py-4">
            How do I get started with an API?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 px-6 pb-4">
            Simply create a free account, browse our catalog of APIs, and select the one you need. 
            Most APIs offer a free trial period. Once subscribed, you&apos;ll receive API credentials 
            to start making requests immediately.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3" className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/50">
          <AccordionTrigger className="text-gray-800 hover:text-[#07AAFF] px-6 py-4">
            What programming languages are supported?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 px-6 pb-4">
            Our platform supports integration with any programming language that can make HTTP requests. 
            Additionally, we provide SDKs for popular languages to make integration even easier.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4" className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/50">
          <AccordionTrigger className="text-gray-800 hover:text-[#07AAFF] px-6 py-4">
            How are API usage limits calculated?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 px-6 pb-4">
            API usage limits vary by subscription tier and specific API. Each API has its own 
            rate limits and quotas. You can view these details on the individual API pages 
            and in your account console once subscribed.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5" className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-xl mb-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/50">
          <AccordionTrigger className="text-gray-800 hover:text-[#07AAFF] px-6 py-4">
            Can I request specific APIs to be added to the platform?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 px-6 pb-4">
            Yes! We welcome API suggestions. Please contact our support team with your request, 
            and we&apos;ll evaluate adding it to our platform based on demand and feasibility.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </section>
  );
}