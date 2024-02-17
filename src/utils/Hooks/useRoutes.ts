import { useMemo } from 'react'
import { useLocation } from 'react-router-dom';
import { FaLightbulb } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { PiProjectorScreen } from 'react-icons/pi';

const useRoutes = () => {
    const {pathname} = useLocation()

    const routes = useMemo(
        ()=>[
            {
                label: "Projects",
                href: "/projects",
                icon: PiProjectorScreen,
                active: pathname === "/projects"
            },
            {
                label: "Skills",
                href: "/skills",
                icon: FaLightbulb,
                active: pathname === "/skills"
            },
            {
                label: "Blog",
                icon: GiNotebook,
                href: "/blog",
                active: pathname === "/blog"
            }
        ],[pathname]
    )
    return routes;
}

export default useRoutes