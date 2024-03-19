import Header from './components/Header/Header'

function App() {

  return (
   <div>
    <Header />

    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
    </Routes>
   </div>
  )
}

export default App
