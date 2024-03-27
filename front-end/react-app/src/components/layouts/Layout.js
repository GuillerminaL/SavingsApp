import MainNavigation from './MainNavigation';

const Layout = (props) => {
    return (
        <div>
            <MainNavigation />
            <main className="w-full m-auto">{props.children}</main>
        </div>
    );
}

export default Layout;