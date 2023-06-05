const Nav = ({ page, setPage }) => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost uppercase text-xl">{page}</a>
            </div>
            <div className="navbar-end gap-2">
                <a className="btn" onClick={() => setPage("rest")}>REST</a>
                <a className="btn" onClick={() => setPage("soap")}>SOAP</a>
            </div>
        </div>
    );
};

export default Nav;
