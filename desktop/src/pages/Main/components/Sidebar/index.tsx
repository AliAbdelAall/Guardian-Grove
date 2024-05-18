import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Assets
import logo from "../../../../assets/logo/logo.png";

// Components
import SmallButton from "../../../../components/SmallButton";
import { removeLocalUser } from "../../../../core/tools/local/user";

type props = {
	admin: string;
};

const Sidebar: FC<props> = ({ admin }) => {
	const navigate = useNavigate();
	const location = useLocation();

	const AdminRoutes = [
		{ path: "/main/overview", text: "Overview" },
		{ path: "/main/parents", text: "Parents" },
		{ path: `/main/psychologists`, text: "Psychologists" },
		{ path: "/main/teachers", text: "Teachers" },
		{ path: "/main/feedback", text: "Feedback" },
	];

	const isActive = (path: string) => location.pathname === path;

	const handleLogout = () => {
		removeLocalUser();
		navigate("/");
	};

	return (
		<div className="flex column align-center sidebar-container">
			<img src={logo} height={101} alt="logo" />
			<div className="flex column full-width sidebar-name">
				<p className="text-acient font-light">Welcome,</p>
				<p className="font-regular text-acient">{admin}</p>
			</div>
			<div className="flex column full-width sidebar-nav">
				{AdminRoutes.map((link, index) => (
					<Link
						key={index}
						to={link.path}
						className={`sidebar-btn ${
							isActive(link.path)
								? "sidebar-active white"
								: "text-acient"
						} text-lg full-width`}
					>
						{link.text}
					</Link>
				))}
			</div>
			<div className="flex align-end sidebar-logout">
				<SmallButton text={"Logout"} handleClick={handleLogout} />
			</div>
		</div>
	);
};

export default Sidebar;
