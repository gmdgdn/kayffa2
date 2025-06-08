import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const InstitutionalInfo = () => {
  const navigate = useNavigate();
  
  const institutionInfo = {
    name: 'The National Digital Archives',
    description: 'Preserving and providing access to our collective cultural heritage through digital preservation and innovative technologies.',
    mission: 'Our mission is to collect, preserve, and provide access to the digital artifacts of historical and cultural significance for research, education, and public engagement.',
    contactEmail: 'info@digitalarchives.org',
    phone: '+1 (555) 123-4567',
    address: '1234 Heritage Lane, Washington, DC 20001',
    socialLinks: [
      { platform: 'Twitter', icon: 'Twitter', url: 'https://twitter.com' },
      { platform: 'Facebook', icon: 'Facebook', url: 'https://facebook.com' },
      { platform: 'Instagram', icon: 'Instagram', url: 'https://instagram.com' },
      { platform: 'YouTube', icon: 'Youtube', url: 'https://youtube.com' }
    ]
  };
  
  const newsUpdates = [
    {
      id: 1,
      title: 'New Partnership with National Museum',
      date: 'May 15, 2023',
      excerpt: 'We\'re excited to announce a new partnership with the National Museum to digitize their rare manuscript collection.'
    },
    {
      id: 2,
      title: 'Digital Preservation Grant Awarded',
      date: 'April 22, 2023',
      excerpt: 'Our institution has been awarded a major grant to enhance our digital preservation capabilities.'
    },
    {
      id: 3,
      title: 'Virtual Exhibition Launch',
      date: 'March 10, 2023',
      excerpt: 'Explore our new virtual exhibition "Treasures of the Ancient World" launching next month.'
    }
  ];
  
  const quickLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Collections Policy', path: '/policy' },
    { label: 'Research Access', path: '/research' },
    { label: 'Contribute Content', path: '/contribute' },
    { label: 'Events & Exhibitions', path: '/events' },
    { label: 'Contact Us', path: '/contact' }
  ];
  
  const handleNewsItemClick = (id) => {
    navigate(`/news/${id}`);
  };
  
  const handleQuickLinkClick = (path) => {
    navigate(path);
  };
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Institutional Information */}
        <div className="lg:col-span-1">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center mr-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.16.21 2.76.21 3.92 0 5.16-1 9-5.45 9-11V7l-10-5z"/>
                <path d="M8 11l2 2 4-4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-primary">{institutionInfo.name}</h2>
          </div>
          
          <p className="text-text-secondary mb-4">{institutionInfo.description}</p>
          <p className="text-text-secondary mb-6">{institutionInfo.mission}</p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-start">
              <Icon name="Mail" size={18} className="text-text-muted mr-3 mt-0.5" />
              <span className="text-text-secondary">{institutionInfo.contactEmail}</span>
            </div>
            <div className="flex items-start">
              <Icon name="Phone" size={18} className="text-text-muted mr-3 mt-0.5" />
              <span className="text-text-secondary">{institutionInfo.phone}</span>
            </div>
            <div className="flex items-start">
              <Icon name="MapPin" size={18} className="text-text-muted mr-3 mt-0.5" />
              <span className="text-text-secondary">{institutionInfo.address}</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            {institutionInfo.socialLinks.map((link, index) => (
              <a 
                key={index}
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center text-text-secondary hover:bg-primary-100 hover:text-primary-600 transition-colors duration-200"
                aria-label={`Follow us on ${link.platform}`}
              >
                <Icon name={link.icon} size={18} />
              </a>
            ))}
          </div>
        </div>
        
        {/* News & Updates */}
        <div className="lg:col-span-1">
          <h3 className="text-xl font-heading font-semibold text-text-primary mb-6 flex items-center">
            <Icon name="Newspaper" size={20} className="mr-2 text-primary-600" />
            News & Updates
          </h3>
          
          <div className="space-y-6">
            {newsUpdates.map((news) => (
              <div 
                key={news.id}
                onClick={() => handleNewsItemClick(news.id)} 
                className="cursor-pointer group"
              >
                <div className="flex items-center text-sm text-text-muted mb-1">
                  <Icon name="Calendar" size={14} className="mr-1.5" />
                  <span>{news.date}</span>
                </div>
                <h4 className="text-lg font-heading font-medium text-text-primary mb-1 group-hover:text-primary-700 transition-colors duration-200">
                  {news.title}
                </h4>
                <p className="text-text-secondary text-sm">{news.excerpt}</p>
                <div className="mt-2 text-primary-600 text-sm font-medium flex items-center group-hover:text-primary-700">
                  <span>Read more</span>
                  <Icon name="ArrowRight" size={14} className="ml-1.5 transform group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="secondary"
            className="mt-6 w-full"
            iconName="Rss"
          >
            View All News
          </Button>
        </div>
        
        {/* Quick Links & Newsletter */}
        <div className="lg:col-span-1">
          <div className="mb-8">
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-6 flex items-center">
              <Icon name="ExternalLink" size={20} className="mr-2 text-primary-600" />
              Quick Links
            </h3>
            
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => handleQuickLinkClick(link.path)}
                  className="w-full flex items-center justify-between p-3 bg-white border border-border rounded-lg hover:bg-secondary-50 transition-colors duration-200 group"
                >
                  <span className="text-text-primary group-hover:text-primary-700">{link.label}</span>
                  <Icon name="ChevronRight" size={16} className="text-text-muted group-hover:text-primary-600" />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-heading font-semibold text-text-primary mb-6 flex items-center">
              <Icon name="Mail" size={20} className="mr-2 text-primary-600" />
              Stay Updated
            </h3>
            
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-5">
              <p className="text-text-secondary mb-4">Subscribe to our newsletter to receive updates on new collections, exhibitions, and events.</p>
              
              <form onSubmit={handleSubscribe}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="you@example.com" 
                    required
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                
                <div className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-primary border-border rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-text-secondary">I agree to receive email updates from the National Digital Archives.</label>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full"
                  iconName="Send"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalInfo;