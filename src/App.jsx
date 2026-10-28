import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Building2, CakeSlice, Check, Flower2, Menu, PartyPopper, TentTree, X } from 'lucide-react';
const WHATSAPP_NUMBER = '254722689711';
const waLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const photos = {
  hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2200&q=88',
  table: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1500&q=85',
  flowers: 'https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1300&q=85',
  dinner: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1300&q=85',
  chairs: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85',
  wedding: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=85',
  ceremony: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1200&q=85',
  setting: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=85',
};
const events = ['Weddings', 'Ruracio & traditional', 'Ithemba ceremonies', 'Graduations', 'Birthdays', 'Baby & bridal showers', 'Corporate gatherings', 'Intimate celebrations'];
const inventory = [
  { id: 'alpine', name: 'Alpine tents', type: 'Tents', description: 'A high-peaked canopy for a striking celebration setting.', image: photos.ceremony, note: 'Sizes and availability on request' },
  { id: 'bline', name: 'B-line tents', type: 'Tents', description: 'A clean-lined tent option for celebrations of every scale.', image: photos.setting, note: 'Sizes and availability on request' },
  { id: 'regular-tent', name: 'Regular tents', type: 'Tents', description: 'Classic covered space for family and community gatherings.', image: photos.wedding, note: 'Sizes and availability on request' },
  { id: 'chiavari', name: 'Chiavari chairs', type: 'Seating', description: 'Elegant seating for ceremonies, receptions and dinner tables.', image: photos.chairs, note: 'Colours and availability on request' },
  { id: 'standard', name: 'Standard chairs', type: 'Seating', description: 'A versatile seating choice for your guests.', image: photos.setting, note: 'Options and availability on request' },
  { id: 'tables', name: 'Tables & napkins', type: 'Table details', description: 'Useful table essentials to bring your setting together.', image: photos.table, note: 'Colours and options on request' },
  { id: 'draping', name: 'Draping', type: 'Decor', description: 'Soft fabric styling to frame your venue and focal areas.', image: photos.dinner, note: 'Styles and availability on request' },
  { id: 'lighting', name: 'Event lighting', type: 'Decor', description: 'A warm glow for the atmosphere you want to create.', image: photos.flowers, note: 'Options and availability on request' },
  { id: 'chandeliers', name: 'Chandeliers', type: 'Decor', description: 'A statement finishing touch for a memorable setting.', image: photos.table, note: 'Styles and availability on request' },
  { id: 'red-carpet', name: 'Red carpets', type: 'Decor', description: 'A welcoming entrance for your guests of honour.', image: photos.wedding, note: 'Lengths and availability on request' },
  { id: 'stage', name: 'Stages & backdrops', type: 'Celebration setups', description: 'A focal point for speeches, photos and special moments.', image: photos.ceremony, note: 'Sizes and styling on request' },
  { id: 'birthday', name: 'Birthday props & backdrops', type: 'Celebration setups', description: 'Backdrop and display ideas for a joyful birthday moment.', image: photos.flowers, note: 'Themes and options on request' },
  { id: 'centre-pieces', name: 'Decor & centrepieces', type: 'Decor', description: 'Finishing touches to bring the feel of your day together.', image: photos.dinner, note: 'Styled to your occasion; ask us' },
];

function App() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showAllItems, setShowAllItems] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTone, setNavTone] = useState('hero-tone');
  const [dialog, setDialog] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', event: '', date: '', location: '', guests: '', message: '' });
  const categories = ['All', 'Tents', 'Seating', 'Table details', 'Decor', 'Celebration setups'];
  const items = useMemo(() => inventory.filter(i => (filter === 'All' || i.type === filter) && i.name.toLowerCase().includes(search.toLowerCase())), [filter, search]);
  const message = () => {
    return `Hello Bonita Events Planners, I'd love to enquire about ${form.event || 'an event'}${form.date ? ` on ${form.date}` : ''}${form.location ? ` in ${form.location}` : ''}${form.guests ? ` for around ${form.guests} guests` : ''}.${form.message ? ` ${form.message}` : ''} Please share availability and a quotation. My name is ${form.name || '[your name]'}${form.phone ? `, ${form.phone}` : ''}.`;
  };
  useEffect(() => {
    const nodes = document.querySelectorAll('.event-link, .item-card, .gallery-photos figure, .why-list > div, .story-image img, .service-note');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.14 });
    nodes.forEach((node, index) => { node.classList.add('reveal-on-scroll'); node.style.setProperty('--reveal-delay', `${(index % 4) * 90}ms`); observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sections = [...document.querySelectorAll('.hero, .feature-photo, .gallery')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const midpoint = window.innerHeight / 2;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - midpoint) * -0.085;
        section.style.setProperty('--parallax-offset', `${offset.toFixed(1)}px`);
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  useEffect(() => {
    const update = () => {
      const section = [...document.querySelectorAll('main > section')].find(node => {
        const rect = node.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom > 100;
      });
      let tone = section ? 'hero-tone' : 'coral-tone';
      if (section?.classList.contains('intro-strip') || section?.classList.contains('story') || section?.classList.contains('services')) tone = 'lilac-tone';
      if (section?.classList.contains('feature-photo') || section?.classList.contains('hire') || section?.classList.contains('contact')) tone = 'coral-tone';
      if (section?.classList.contains('gallery')) tone = 'plum-tone';
      if (section?.classList.contains('why') || section?.classList.contains('quote-band')) tone = 'mint-tone';
      setNavTone(tone);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  const sendInquiry = (e) => { e.preventDefault(); setSent(true); };
  return <>
    <header className={`topbar ${navTone}`}><a className="brand" href="#home">Bonita<span>EVENTS PLANNERS</span></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button><nav className={menuOpen ? 'nav open' : 'nav'}><a href="#story" onClick={() => setMenuOpen(false)}>Our approach</a><a href="#services" onClick={() => setMenuOpen(false)}>Celebrations</a><a href="#hire" onClick={() => setMenuOpen(false)}>Equipment hire</a><a href="#gallery" onClick={() => setMenuOpen(false)}>Inspiration</a></nav><a className="nav-cta" href="#contact">Let’s talk <ArrowUpRight size={14}/></a></header>
    <main>
      <section id="home" className="hero" style={{'--hero': `url("${photos.hero}")`}}><div className="hero-shade"/><div className="hero-copy"><p className="eyebrow light">KENYA · EVENTS, THOUGHTFULLY PLANNED</p><h1>Gather beautifully.<br/><em>Remember always.</em></h1><p className="hero-sub">From the first idea to the final table setting, we make space for the moments that matter.</p><a href="#services" className="button button-light">Explore what we do <ArrowDown size={15}/></a></div><div className="hero-caption"><span>CELEBRATIONS WITH MEANING</span><span>01 / 04</span></div><div className="hero-mark">B<span><Flower2 size={15}/></span>P</div></section>
      <section className="intro-strip"><span className="ribbon-kicker">MADE FOR YOUR MOMENT</span><div className="intro-categories"><a href="#services" className="intro-category"><Flower2/><span>Weddings</span></a><a href="#services" className="intro-category"><TentTree/><span>Ruracio</span></a><a href="#services" className="intro-category"><CakeSlice/><span>Milestones</span></a><a href="#services" className="intro-category"><PartyPopper/><span>Gatherings</span></a><a href="#services" className="intro-category"><Building2/><span>Corporate</span></a></div><a className="ribbon-cta" href="#contact">Tell us what you’re celebrating <ArrowRight size={15}/></a></section>
      <section id="story" className="story section-grid"><div className="story-image"><img src={photos.flowers} alt="Soft floral styling for a celebration"/><span className="image-index">A THOUGHTFUL TOUCH · 01</span></div><div className="story-text"><p className="eyebrow">A LITTLE ABOUT BONITA</p><h2>Good celebrations<br/>feel like <em>you.</em></h2><p className="body-copy">The best gatherings aren’t measured by how much they have. They’re remembered for how they made everyone feel. We bring the details together — planning, styling and equipment hire — so you can be right there in the moment.</p><p className="signature">Let’s make it yours.</p><a href="#contact" className="text-link">Get to know us <ArrowRight size={15}/></a><div className="sun-stamp">B<br/><Flower2 size={17}/><br/>P</div></div></section>
      <section id="services" className="services"><div className="section-heading"><div><p className="eyebrow">THE OCCASIONS THAT BRING US TOGETHER</p><h2>Every reason to <em>gather.</em></h2></div><p>From life’s big milestones to just-because moments, let’s plan a day that feels entirely your own.</p></div><div className="event-grid">{events.map((event, i) => <a key={event} href="#contact" className="event-link"><span className="event-num">0{i + 1}</span><span>{event}</span><ArrowUpRight size={16}/></a>)}</div><div className="service-note"><span>YOUR VISION, YOUR WAY</span><p>Planning, styling and hire can each be tailored to your celebration. Tell us what you have in mind and we’ll talk through the possibilities.</p><a href="#contact" className="button button-wine">Start a conversation <ArrowRight size={15}/></a></div></section>
      <section className="feature-photo" style={{'--feature': `url("${photos.table}")`}}><div className="feature-overlay"><p className="eyebrow light">MADE OF A THOUSAND LITTLE DETAILS</p><h2>Set the scene.<br/><em>Stay for the feeling.</em></h2><a href="#gallery" className="button button-light">See the inspiration <ArrowDown size={15}/></a></div></section>
      <section id="hire" className="hire"><div className="section-heading hire-head"><div><p className="eyebrow">THE DETAILS, TAKEN CARE OF</p><h2>Hire for your <em>gathering.</em></h2></div><p>Browse a few of the things you can ask us about. We’ll confirm styles, quantities and availability when you enquire.</p></div><div className="catalog-tools"><div className="filters">{categories.map(c => <button className={filter === c ? 'filter active' : 'filter'} onClick={() => setFilter(c)} key={c}>{c}</button>)}</div><label className="search"><span className="sr-only">Search equipment</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Find an item…"/><span>⌕</span></label></div><div className={`catalog-grid ${showAllItems ? 'expanded' : ''}`}>{items.map(item => <article className="item-card" key={item.id}><div className="item-image"><img src={item.image} alt={item.name}/><span className="item-tag">{item.type}</span></div><div className="item-info"><div><h3>{item.name}</h3><p>{item.description}</p><small>{item.note}</small></div><button className="ask-item" onClick={() => {setForm({...form,message:`I’m interested in ${item.name}. Please share the options and availability.`});setDialog(true);setSent(false)}}>Ask about this <ArrowUpRight size={14}/></button></div></article>)}</div>{items.length > 6 && <button className="mobile-catalog-toggle" onClick={() => setShowAllItems(!showAllItems)}>{showAllItems ? 'Show fewer items' : `Show all ${items.length} items`} <ArrowDown size={14}/></button>}<div className="catalog-foot"><p>Ask about any item and Bonita will confirm styles, pricing and availability for your date.</p><button className="button button-wine" onClick={() => {setDialog(true); setSent(false)}}>Ask for a quotation <ArrowRight size={15}/></button></div><p className="availability-note">Photos are inspiration. Stock, pricing, delivery and setup are confirmed by Bonita for each enquiry.</p></section>
      <section id="gallery" className="gallery"><div className="gallery-title"><p className="eyebrow light">A FEELING IN THE MAKING</p><h2>Some days stay<br/><em>with you.</em></h2><p>A few ideas for the day you’re dreaming up.</p></div><div className="gallery-photos"><figure className="gallery-tall"><img src={photos.wedding} alt="An intimate wedding celebration"/><figcaption>THE BIG YES <span>01</span></figcaption></figure><figure><img src={photos.ceremony} alt="A beautifully styled gathering"/><figcaption>GATHER AROUND <span>02</span></figcaption></figure><figure><img src={photos.dinner} alt="Thoughtfully arranged dinner table"/><figcaption>THE LITTLE DETAILS <span>03</span></figcaption></figure></div><p className="gallery-disclaimer">A moodboard of possibilities — Bonita’s own event portfolio will be added here.</p></section>
      <section className="why"><div className="why-title"><p className="eyebrow">THE BONITA WAY</p><h2>Easy to plan.<br/><em>Lovely to live.</em></h2></div><div className="why-list"><div><span>01</span><p><strong>We begin by listening.</strong><br/>Your people, your plans, your kind of celebration — everything starts with what matters to you.</p></div><div><span>02</span><p><strong>Considered, personal details.</strong><br/>The little touches come together around your vision, with care at every step.</p></div><div><span>03</span><p><strong>One helpful conversation.</strong><br/>Planning, styling and hire can come together in a single enquiry tailored to your day.</p></div></div></section>
      <section className="quote-band"><span><Flower2 size={22}/></span><p>“The moments we make room for<br/>are the ones we <em>keep.</em>”</p><span>✳</span></section>
      <section id="contact" className="contact"><div><p className="eyebrow light">YOUR DAY STARTS HERE</p><h2>Tell us what<br/>you’re <em>dreaming of.</em></h2><p>Share a little about your gathering. We’ll get back to you to talk through dates, ideas and a quotation.</p><button className="button button-light" onClick={() => {setDialog(true); setSent(false)}}>Start an enquiry <ArrowRight size={15}/></button></div><div className="contact-side"><div className="contact-spark">✳</div><p>Have a quick question?</p><a className="contact-whatsapp" target="_blank" rel="noreferrer" href={waLink('Hello Bonita Events Planners, I have a question about your event planning and equipment hire services. Could you please get back to me?')}>Chat with us on WhatsApp <ArrowUpRight size={16}/></a><small>We’ll reply as soon as we can.</small><div className="contact-hours"><span>BASED IN KENYA</span><span>HERE FOR YOUR CELEBRATION</span></div></div></section>
    </main>
    <footer><a className="brand footer-brand" href="#home">Bonita<span>EVENTS PLANNERS</span></a><p>Good days, thoughtfully made.</p><nav><a href="#services">Celebrations</a><a href="#hire">Equipment hire</a><a href="#contact">Contact</a></nav><span className="copyright">© {new Date().getFullYear()} Bonita Events Planners</span></footer>
    {dialog && <div className="modal-backdrop" onClick={e => {if(e.target === e.currentTarget) setDialog(false)}}><div className="modal"><button className="modal-close" onClick={() => setDialog(false)} aria-label="Close"><X/></button>{sent ? <div className="sent-state"><span className="check-icon"><Check/></span><p className="eyebrow">READY WHEN YOU ARE</p><h2>Your message is<br/><em>all set.</em></h2><p>We’ve put your enquiry into a WhatsApp message. Send it to Bonita and we’ll follow up about availability and your quotation.</p><a className="button button-wine" href={waLink(message())} target="_blank" rel="noreferrer">Open WhatsApp <ArrowUpRight size={15}/></a><small>Your enquiry is not a confirmed booking. Availability is checked with Bonita.</small></div> : <><p className="eyebrow">LET’S TALK DETAILS</p><h2>Start an <em>enquiry.</em></h2><p className="modal-intro">A few details help us get back to you with a useful answer. No booking is confirmed until Bonita checks availability with you.</p><form onSubmit={sendInquiry}><div className="form-row"><label>Your name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Full name"/></label><label>Phone number<input required type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="e.g. 07…"/></label></div><div className="form-row"><label>What are you celebrating?<select value={form.event} onChange={e=>setForm({...form,event:e.target.value})}><option value="">Choose an occasion</option>{events.map(x=><option key={x}>{x}</option>)}<option>Equipment hire only</option><option>Something else</option></select></label><label>Event date<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></label></div><div className="form-row"><label>Location<input value={form.location} onChange={e=>setForm({...form,location:e.target.value})} placeholder="Town or venue"/></label><label>Estimated guests<input type="number" min="1" value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})} placeholder="If known"/></label></div><label>Anything else we should know?<textarea rows="3" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Your ideas, equipment needs, or questions…"/></label><button className="button button-wine form-submit" type="submit">Continue to WhatsApp <ArrowUpRight size={15}/></button><small>We’ll open WhatsApp with your message ready. Sending it there shares it directly with Bonita.</small></form></>}</div></div>}
    <a className="floating-wa" href={waLink('Hello Bonita Events Planners, I would love to enquire about planning or hiring equipment for an event.')} target="_blank" rel="noreferrer" aria-label="Message Bonita on WhatsApp"><span>WA</span></a>
  </>;
}

export default App;
