    import React, { useState } from "react";
    import "../styles/Header.css";

    interface HeaderProps {
    onSearch: (searchTerm: string) => void;
    }

    const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <header className="header">
        <div className="container">
            <h1 className="header-title">GeoWorld</h1>
            <div className="header-controls">
            <input
                type="text"
                placeholder="Search by name or region"
                className="header-search"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            </div>
        </div>
        </header>
    );
    };

    export default Header;
