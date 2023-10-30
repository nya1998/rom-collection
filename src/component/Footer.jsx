import { Link } from 'react-router-dom';

const Footer = () => {
    const currentWebsite = window.location.hostname;
    return (
        <footer className="bg-white rounded-lg shadow dark:bg-gray-900 mt-auto">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">{currentWebsite}</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <Link className="mr-4 hover:underline md:mr-6 " to="/about">About</Link>
                    </li>
                    <li>
                        <Link className="mr-4 hover:underline md:mr-6 " to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                    <Link className="mr-4 hover:underline md:mr-6 " to="/contact">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;