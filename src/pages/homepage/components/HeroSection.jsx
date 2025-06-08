import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/ui/Button';
import Image from 'components/AppImage';
import Icon from 'components/AppIcon';

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Featured slides data
  const heroSlides = [
    {
      id: 1,
      title: 'Explore Ancient Civilizations',
      subtitle: 'Discover artifacts, documents, and stories from the ancient world',
      description: 'Our comprehensive digital archive provides unprecedented access to cultural heritage artifacts spanning thousands of years of human history.',
      imageUrl: 'https://images.unsplash.com/photo-1603339865607-3d5dd48a4b59?w=1200&h=600&fit=crop',
      ctaText: 'Explore Collections',
      ctaLink: '/search-results?category=ancient-civilizations',
      color: 'from-primary-900/80 to-primary-700/80'
    },
    {
      id: 2,
      title: 'Medieval Manuscript Collection',
      subtitle: 'Digitized rare manuscripts from the 12th-15th centuries',
      description: 'Browse high-resolution scans of illuminated manuscripts with detailed transcriptions and scholarly annotations.',
      imageUrl: 'https://images.pexels.com/photos/5961610/pexels-photo-5961610.jpeg?w=1200&h=600&fit=crop',
      ctaText: 'View Manuscripts',
      ctaLink: '/search-results?category=manuscripts',
      color: 'from-accent-900/80 to-accent-700/80'
    },
    {
      id: 3,
      title: 'Photography Through Time',
      subtitle: 'Visual documentation of historical events and daily life',
      description: 'Explore our extensive photographic archive chronicling significant historical moments and everyday scenes from the past 150 years.',
      imageUrl: 'https://images.pixabay.com/photo/2017/07/01/19/48/türkentor-2462905_1280.jpg?w=1200&h=600&fit=crop',
      ctaText: 'Browse Photography',
      ctaLink: '/search-results?category=photography',
      color: 'from-secondary-900/80 to-secondary-700/80'
    }
  ];

  // Auto rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 8000);

    return () => clearInterval(interval);
  }, [activeSlide]);

  const goToSlide = (index) => {
    if (index === activeSlide || isTransitioning) return;
    
    setIsTransitioning(true);
    setActiveSlide(index);
    
    // Reset transitioning state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNextSlide = () => {
    const nextSlide = (activeSlide + 1) % heroSlides.length;
    goToSlide(nextSlide);
  };

  const goToPrevSlide = () => {
    const prevSlide = (activeSlide - 1 + heroSlides.length) % heroSlides.length;
    goToSlide(prevSlide);
  };

  const handleCtaClick = (link) => {
    navigate(link);
  };

  return (
    <div className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
      {/* Hero Slides */}
      {heroSlides.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 w-full h-full">
            <Image 
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover animate-scale-in"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} mix-blend-multiply`}></div>
          </div>
          
          {/* Content */}
          <div className="relative z-20 h-full flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl text-white">
                <h2 className="text-xl sm:text-2xl text-white/90 font-caption mb-3 animate-slide-in" 
                     style={{animationDelay: '100ms'}}>
                  {slide.subtitle}
                </h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4 animate-slide-in"
                     style={{animationDelay: '200ms'}}>
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg text-white/80 mb-8 font-body max-w-xl animate-slide-in"
                   style={{animationDelay: '300ms'}}>
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-in" style={{animationDelay: '400ms'}}>
                  <Button 
                    onClick={() => handleCtaClick(slide.ctaLink)}
                    variant="primary"
                    size="lg"
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="bg-white text-primary-800 hover:bg-white/90"
                  >
                    {slide.ctaText}
                  </Button>
                  <Button 
                    onClick={() => handleCtaClick('/search-results')}
                    variant="outline"
                    size="lg"
                    iconName="Search"
                    className="border-white/50 text-white hover:bg-white/10"
                  >
                    Search All Archives
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrow Controls (Desktop) */}
      <div className="hidden md:block">
        <button 
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all duration-200"
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <Icon name="ChevronLeft" size={24} />
        </button>
        <button 
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all duration-200"
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <Icon name="ChevronRight" size={24} />
        </button>
      </div>
    </div>
  );
};

export default HeroSection;