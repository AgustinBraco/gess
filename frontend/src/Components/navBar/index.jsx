import { Link } from 'react-router-dom';
import  Gess  from '../../Assets/Gess.png';
import  Users  from '../../Assets/Users.png';

const NavBar = () => (
	<nav className="NvBar">
		<div className="ContTit">
			<img src={Gess} alt="logo" className='Gess'/>
			<Link className="link TIT" to="/">Gess</Link>
		</div>
		<div className="ContLinks">
			<Link className="link" to="/">
				Home
			</Link>
			<Link className="link" to="/login">
				Conocenos
			</Link>
			<Link className="link" to="/registro">
				Clientes
			</Link>
			<Link className="link" to="/registro">
				Servicios
			</Link>
			<Link className="link" to="/registro">
				Contactanos
			</Link>
		</div>
		<img src={Users} alt="users" className='Users'/>
	</nav>
);

export { NavBar };
