import { useState } from 'react';
import { Check, Truck, Clock, MapPin, Weight, Shield } from 'lucide-react';
import { useSkipsByLocation } from '../hooks/useSkips';

export const SelectSkipPage = () => {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [hoveredSkip, setHoveredSkip] = useState(null);
  const { skips } = useSkipsByLocation("NR32", "Lowestoft");

  const calculatePriceWithVAT = (priceBeforeVat, vat) => {
    return priceBeforeVat * (1 + vat / 100);
  };

  const getModernSkipVisual = (size, isHovered) => {
    const gradients = {
      4: 'from-amber-400 via-orange-500 to-red-500',
      6: 'from-blue-400 via-purple-500 to-pink-500',
      8: 'from-green-400 via-teal-500 to-blue-500',
      10: 'from-purple-400 via-pink-500 to-red-500',
      12: 'from-indigo-400 via-purple-500 to-pink-500',
      14: 'from-cyan-400 via-blue-500 to-purple-500',
      16: 'from-rose-400 via-pink-500 to-purple-500',
      20: 'from-yellow-400 via-orange-500 to-red-500',
      40: 'from-emerald-400 via-teal-500 to-cyan-500'
    };
    
    const gradient = gradients[size] || 'from-gray-400 via-gray-500 to-gray-600';
    
    return (
      <div className="relative w-full h-56 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[length:30px_30px]"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            relative transition-all duration-500 ease-out
            ${isHovered ? 'scale-110 rotate-y-12' : 'scale-100'}
          `}>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black/20 rounded-full blur-sm"></div>
            
            <div className={`
              relative w-36 h-24 bg-gradient-to-br ${gradient} rounded-xl shadow-2xl
              border border-white/20 backdrop-blur-sm
              ${isHovered ? 'shadow-[0_0_30px_rgba(59,130,246,0.5)]' : ''}
            `}>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent rounded-xl"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="text-2xl font-black mb-1">{size}</div>
                <div className="text-xs font-semibold opacity-90">YARDS</div>
              </div>
              
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-white/20 rounded-full"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-3 bg-black/20 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1">
          <span className="text-white font-bold text-sm">{size}Y</span>
        </div>
        
        {isHovered && (
          <>
            <div className="absolute top-8 left-8 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="absolute top-16 right-12 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-12 left-16 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-12">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              Choose Your
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Skip Size</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Professional waste management solutions with transparent pricing, 
              flexible hire periods, and exceptional service quality.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skips?.map((skip) => {
            const priceWithVAT = calculatePriceWithVAT(skip.price_before_vat, skip.vat);
            const isSelected = selectedSkip?.id === skip.id;
            const isHovered = hoveredSkip === skip.id;
            
            return (
              <div
                key={skip.id}
                className={`
                  group relative bg-white/70 backdrop-blur-sm rounded-3xl border transition-all duration-500 cursor-pointer
                  hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25
                  ${isSelected 
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/25 bg-white scale-105' 
                    : 'border-white/50 shadow-xl hover:border-blue-300'
                  }
                `}
                onClick={() => setSelectedSkip(skip)}
                onMouseEnter={() => setHoveredSkip(skip.id)}
                onMouseLeave={() => setHoveredSkip(null)}
              >

                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-3 z-20 shadow-lg">
                    <Check className="w-5 h-5" />
                  </div>
                )}

                <div className="p-6 pb-4">
                  {getModernSkipVisual(skip.size, isHovered)}
                </div>

                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900">
                        {skip.size} Yard Skip
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {skip.hire_period_days} days hire
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${skip.allowed_on_road ? 'bg-green-100' : 'bg-amber-100'}`}>
                          <MapPin className={`w-4 h-4 ${skip.allowed_on_road ? 'text-green-600' : 'text-amber-600'}`} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {skip.allowed_on_road ? 'Road Placement' : 'Private Property'}
                        </span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${skip.allowed_on_road ? 'bg-green-400' : 'bg-amber-400'}`}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-lg mr-3 ${skip.allows_heavy_waste ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <Weight className={`w-4 h-4 ${skip.allows_heavy_waste ? 'text-blue-600' : 'text-gray-400'}`} />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          Heavy Waste
                        </span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${skip.allows_heavy_waste ? 'bg-blue-400' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-4 mb-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-3xl font-black text-gray-900">
                          £{priceWithVAT.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-500">
                          £{skip.price_before_vat} + VAT
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-blue-600">
                          All inclusive
                        </div>
                        {skip.transport_cost && (
                          <div className="text-xs text-gray-500">
                            +£{skip.transport_cost} transport
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    className={`
                      w-full py-4 px-6 rounded-2xl font-bold text-sm transition-all duration-300
                      flex items-center justify-center gap-2 relative overflow-hidden
                      ${isSelected
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700'
                      }
                    `}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSkip(skip);
                    }}
                  >
                    <div className="flex items-center gap-2 relative z-10">
                      <Truck className="w-4 h-4" />
                      {isSelected ? 'Selected' : 'Select This Skip'}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedSkip && (
          <div className="mt-16 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-semibold mb-4">
                <Shield className="w-4 h-4" />
                Excellent Choice
              </div>
              <h3 className="text-3xl font-black mb-4">
                {selectedSkip.size} Yard Skip Selected
              </h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Total cost: £{calculatePriceWithVAT(selectedSkip.price_before_vat, selectedSkip.vat).toFixed(0)} 
                <span className="mx-2">•</span>
                {selectedSkip.hire_period_days} day hire period
                <span className="mx-2">•</span>
                Professional service guaranteed
              </p>
              <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                Continue to Next Step →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};