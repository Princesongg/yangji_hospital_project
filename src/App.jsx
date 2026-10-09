import Hero from './components/hero/Hero';
import './App.css';
import Con1 from './components/con1/con1';
import Con2 from './components/con2/con2';
import Con3 from './components/con3/con3';
import Con4 from './components/con4/con4';
import Con5 from './components/con5/con5';
import Con6 from './components/con6/con6';
import Con7 from './components/con7/con7';
import Footer from './components/footer/Footer';
import QuickMenu from './components/quick-menu/QuickMenu';

const App = () => (
    <>
    <main className="site-main">
        <Hero />
        <Con1 />
        <Con2 />
        <Con3 />
        <Con4 />
        <Con5 />
        <Con6 />
        <Con7 />
    </main>
    <Footer />
    <QuickMenu />
    </>
);

export default App;




