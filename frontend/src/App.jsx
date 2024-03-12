import { Inicio, Login, Registro, RegistroGes, ComoFuncionaUs, Configuracion, Favoritos, Historial, MenuUs, PrivacidadAndPoliticas, Servicios, ComoFunciona, ConfiguracionG, HistorialG, MenuG } from './Pages';
import { NavBar, Footer } from './Components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Inicio />} />
					<Route path="/Login" element={<Login />} />
					<Route path="/Registro" element={<Registro />} />
					<Route path="/RegistroGes" element={<RegistroGes />} />

					{/* Usuario */}

					<Route path="/ComoFuncionaUs" element={< ComoFuncionaUs/>} />
					<Route path="/Configuracion" element={< Configuracion/>} />
					<Route path="/Favoritos" element={< Favoritos/>} />
					<Route path="/Historial" element={< Historial/>} />
					<Route path="/MenuUs" element={< MenuUs/>} />
					<Route path="/PrivacidadAndPoliticas" element={< PrivacidadAndPoliticas/>} />
					<Route path="/Servicios" element={< Servicios/>} />

					{/* Gestor */}

					<Route path="/ComoFuncionaGes" element={< ComoFunciona/>} />
					<Route path="/ConfiguracionG" element={< ConfiguracionG/>} />
					<Route path="/HistorialG" element={< HistorialG/>} />
					<Route path="/MenuG" element={< MenuG/>} />

				</Routes>
				<Footer />
			</Router>
		</div>
	);
}

export default App;
