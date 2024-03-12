import {Link} from 'react-router-dom'

const Login = () => {
	return (
		<div className="ContLog">
			<div className="log">
				<h2>Login</h2>
				<form method="get" className="cajaLog">
					<input
						className="inp"
						type="text"
						name="nombre"
						required
						placeholder="Escribe tu Usuario..."
					></input>

					<input
						className="inp"
						type="password"
						name="contraseña"
						required
						placeholder="Escribe tu Contraseña..."
					></input>

					<input type="submit" value="Ingresar" className="btnCont"></input>
				</form>
				<Link className='Link' to='/Registro'>Si aun no tienes una cuenta pulsa aqui</Link>
			</div>
		</div>
	);
};

export { Login };
