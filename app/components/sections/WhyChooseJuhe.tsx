import { Zap, Lock, BarChart3, Code } from "lucide-react";

const features = [
  {
    title: "High Performance",
    description: "Global infrastructure with low latency and high availability for reliable API calls.",
    icon: Zap,
    color: "text-yellow-500",
    gradient: "from-yellow-400 to-orange-500",
    bgGradient: "from-yellow-400/10 to-orange-500/10",
  },
  {
    title: "Enterprise Security",
    description: "Advanced security measures to protect your data and ensure compliance.",
    icon: Lock,
    color: "text-green-500",
    gradient: "from-green-400 to-emerald-500",
    bgGradient: "from-green-400/10 to-emerald-500/10",
  },
  {
    title: "Comprehensive Analytics",
    description: "Detailed insights into API usage, performance metrics, and optimization opportunities.",
    icon: BarChart3,
    color: "text-[#07AAFF]",
    gradient: "from-blue-400 to-cyan-500",
    bgGradient: "from-blue-400/10 to-cyan-500/10",
  },
  {
    title: "Developer Friendly",
    description: "Extensive documentation, SDKs, and code samples for quick integration.",
    icon: Code,
    color: "text-purple-500",
    gradient: "from-purple-400 to-pink-500",
    bgGradient: "from-purple-400/10 to-pink-500/10",
  },
];

export default function WhyChooseJuhe() {
  return (
    <section className="py-20 px-4 relative">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>
      
      {/* Floating liquid glass elements */}
      <div className="absolute top-16 left-12 w-28 h-28 bg-gradient-to-br from-blue-300/15 to-cyan-200/10 rounded-full filter blur-xl "></div>
      <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-br from-purple-300/20 to-pink-200/10 rounded-full filter blur-xl "></div>
      <div className="absolute bottom-24 left-1/4 w-20 h-20 bg-gradient-to-br from-yellow-300/25 to-orange-200/15 rounded-full filter blur-xl "></div>
      <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-green-300/15 to-emerald-200/10 rounded-full filter blur-xl "></div>
      <div className="absolute bottom-40 right-12 w-24 h-24 bg-gradient-to-br from-cyan-300/20 to-teal-200/10 rounded-full filter blur-xl "></div>
      
      {/* Floating glass particles */}
      <div className="absolute top-20 left-1/3 w-3 h-3 bg-white/20 backdrop-blur-sm rounded-full "></div>
      <div className="absolute bottom-16 left-16 w-4 h-4 bg-white/15 backdrop-blur-sm rounded-full "></div>
      <div className="absolute top-1/2 right-8 w-2 h-2 bg-white/25 backdrop-blur-sm rounded-full "></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Choose Juhe API</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform delivers enterprise-grade performance, security, and developer tools to accelerate your project timeline
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/60 backdrop-blur-lg border border-white/30 shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}
              >
                <feature.icon className={`w-10 h-10 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}