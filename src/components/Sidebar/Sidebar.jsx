import React, { useState } from 'react';
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard, Check, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const Sidebar = ( ) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate=useNavigate();
    const menuItems = [
      { id: 'postcode', icon: MapPin, label: 'Postcode', description: 'Enter your location', status: 'active' },
      { id: 'waste-type', icon: Trash2, label: 'Waste Type', description: 'Select waste category', status: 'inactive' },
      { id: 'select-skip', icon: Truck, label: 'Select Skip', description: 'Choose skip size', status: 'inactive' },
      { id: 'permit-check', icon: Shield, label: 'Permit Check', description: 'Verify requirements', status: 'inactive' },
      { id: 'choose-date', icon: Calendar, label: 'Choose Date', description: 'Schedule delivery', status: 'inactive' },
      { id: 'payment', icon: CreditCard, label: 'Payment', description: 'Complete order', status: 'inactive' }
    ];

    const [activeItem, setActiveItem] = useState('select-skip');

    const handleOnClick = (itemId) => {
      const activeIndex = menuItems.findIndex(item => item.id === activeItem);
      const clickedIndex = menuItems.findIndex(item => item.id === itemId);
      
      if (clickedIndex <= activeIndex) {
        setActiveItem(itemId);
      }
      navigate(`/${itemId}`);
    }

  const getItemStatus = (itemId) => {
    const activeIndex = menuItems.findIndex(item => item.id === activeItem);
    const currentIndex = menuItems.findIndex(item => item.id === itemId);
    
    if (currentIndex < activeIndex) return 'completed';
    if (currentIndex === activeIndex) return 'active';
    return 'inactive';
  };

  const isClickable = (itemId) => {
    const activeIndex = menuItems.findIndex(item => item.id === activeItem);
    const currentIndex = menuItems.findIndex(item => item.id === itemId);
    return currentIndex <= activeIndex;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const DesktopSidebar = () => (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[length:30px_30px] opacity-20"></div>
      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <nav className="flex items-center justify-center">
              <ol className="flex items-center space-x-0 flex-wrap justify-center">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const status = getItemStatus(item.id);
                  const clickable = isClickable(item.id);
                  const isLast = index === menuItems.length - 1;

                  return (
                    <li key={item.id} className="relative flex items-center">
                      <div
                        onClick={() => clickable && handleOnClick(item.id)}
                        className={`
                          step-item group flex items-center
                          transition-all duration-300 ease-out
                          ${clickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                          ${status === 'active' && clickable ? 'scale-105' : clickable ? 'hover:scale-102' : ''}
                        `}
                      >
                        <div className="relative flex items-center justify-center">
                          <div className={`
                            step-circle w-14 h-14 rounded-full border-2 flex items-center justify-center
                            transition-all duration-300 ease-in-out relative overflow-hidden
                            ${status === 'completed' 
                              ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/25' 
                              : status === 'active'
                              ? 'bg-white border-white text-blue-600 shadow-xl shadow-white/25'
                              : clickable 
                              ? 'bg-white/10 border-white/30 text-white/70 group-hover:border-white/50 group-hover:bg-white/20'
                              : 'bg-white/5 border-white/20 text-white/40'
                            }
                          `}>
                            {status === 'completed' ? (
                              <Check className="w-6 h-6" />
                            ) : (
                              <IconComponent className="w-6 h-6" />
                            )}
                            
                            {/* Shine effect - seulement pour les éléments cliquables */}
                            {clickable && (
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
                            )}
                          </div>
                          
                          {status === 'active' && (
                            <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30"></div>
                          )}
                        </div>

                        <div className="ml-4 min-w-0 flex-1">
                          <div className={`
                            text-sm font-bold transition-colors duration-200
                            ${status === 'active' 
                              ? 'text-white' 
                              : status === 'completed' 
                              ? 'text-green-100' 
                              : clickable 
                              ? 'text-white/80 group-hover:text-white'
                              : 'text-white/40'
                            }
                          `}>
                            {item.label}
                          </div>
                          <div className={`
                            text-xs mt-1 transition-colors duration-200
                            ${status === 'active' 
                              ? 'text-blue-100' 
                              : status === 'completed' 
                              ? 'text-green-200' 
                              : clickable 
                              ? 'text-white/60 group-hover:text-white/80'
                              : 'text-white/30'
                            }
                          `}>
                            {item.description}
                          </div>
                        </div>
                      </div>

                      {!isLast && (
                        <div className={`
                          step-connector w-12 lg:w-16 h-0.5 mx-3 lg:mx-4 transition-colors duration-300
                          ${status === 'completed' ? 'bg-green-300/60' : 'bg-white/30'}
                        `}></div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );

  const MobileSidebar = () => (
    <>
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <div className={`
                w-10 h-10 rounded-full border-2 flex items-center justify-center
                ${getItemStatus(activeItem) === 'completed' 
                  ? 'bg-green-500 border-green-400 text-white' 
                  : 'bg-white border-white text-blue-600'
                }
              `}>
                {getItemStatus(activeItem) === 'completed' ? (
                  <Check className="w-5 h-5" />
                ) : (
                  React.createElement(menuItems.find(item => item.id === activeItem)?.icon, {
                    className: "w-5 h-5"
                  })
                )}
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">
                  {menuItems.find(item => item.id === activeItem)?.label}
                </h1>
                <p className="text-blue-200 text-sm">
                  Step {menuItems.findIndex(item => item.id === activeItem) + 1} of {menuItems.length}
                </p>
              </div>
            </div>
            <button 
              onClick={toggleMobileMenu}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-2 text-white hover:bg-white/30 transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          ></div>
          
          {/* Menu */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden transform transition-transform duration-300">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(255,255,255,.05)_25%,rgba(255,255,255,.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.05)_75%,rgba(255,255,255,.05)_76%,transparent_77%,transparent)] bg-[length:30px_30px] opacity-20"></div>
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <div>
                  <h2 className="text-white font-black text-xl">Skip Hire Process</h2>
                  <p className="text-blue-200 text-sm">Choose your step</p>
                </div>
                <button 
                  onClick={toggleMobileMenu}
                  className="bg-white/20 backdrop-blur-sm rounded-xl p-2 text-white hover:bg-white/30 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Steps */}
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {menuItems.map((item, index) => {
                  const IconComponent = item.icon;
                  const status = getItemStatus(item.id);
                  const clickable = isClickable(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`
                        group relative
                        ${clickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                        ${status === 'active' && clickable ? 'scale-105' : clickable ? 'hover:scale-102' : ''}
                        transition-all duration-300 ease-out
                      `}
                      onClick={() => {
                        if (clickable) {
                          handleOnClick(item.id);
                          toggleMobileMenu();
                        }
                      }}
                    >
                      <div className={`
                        relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border
                        transition-all duration-300
                        ${status === 'active' 
                          ? 'border-white bg-white/10 shadow-lg shadow-white/25' 
                          : status === 'completed'
                          ? 'border-green-400/50 bg-green-500/10'
                          : clickable
                          ? 'border-white/20 hover:border-white/40 hover:bg-white/10'
                          : 'border-white/10 bg-white/2'
                        }
                      `}>
                        
                        <div className="flex items-center space-x-4">
                          {/* Icon Circle */}
                          <div className="relative flex-shrink-0">
                            <div className={`
                              w-12 h-12 rounded-full border-2 flex items-center justify-center
                              transition-all duration-300
                              ${status === 'completed' 
                                ? 'bg-green-500 border-green-400 text-white' 
                                : status === 'active'
                                ? 'bg-white border-white text-blue-600'
                                : clickable
                                ? 'bg-white/10 border-white/30 text-white/70'
                                : 'bg-white/5 border-white/20 text-white/40'
                              }
                            `}>
                              {status === 'completed' ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <IconComponent className="w-5 h-5" />
                              )}
                            </div>
                            
                            {status === 'active' && (
                              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-30"></div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`
                              font-bold text-sm transition-colors duration-200
                              ${status === 'active' 
                                ? 'text-white' 
                                : status === 'completed' 
                                ? 'text-green-200' 
                                : clickable
                                ? 'text-white/80'
                                : 'text-white/40'
                              }
                            `}>
                              {item.label}
                            </div>
                            <div className={`
                              text-xs mt-1 transition-colors duration-200
                              ${status === 'active' 
                                ? 'text-blue-200' 
                                : status === 'completed' 
                                ? 'text-green-300' 
                                : clickable
                                ? 'text-white/50'
                                : 'text-white/30'
                              }
                            `}>
                              {item.description}
                            </div>
                          </div>

                          <div className={`
                            text-xs font-black px-2 py-1 rounded-full
                            ${status === 'active' 
                              ? 'bg-white text-blue-600' 
                              : status === 'completed' 
                              ? 'bg-green-500 text-white' 
                              : clickable
                              ? 'bg-white/10 text-white/50'
                              : 'bg-white/5 text-white/30'
                            }
                          `}>
                            {index + 1}
                          </div>
                        </div>

                        {clickable && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <DesktopSidebar />
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <MobileSidebar />
      </div>
    </>
  );
};

export default Sidebar;