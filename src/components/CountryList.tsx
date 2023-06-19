    import React, { useEffect, useState } from "react";
    import "../styles/CountryList.css";
    import { fetchCountries } from "../api";
    import { Country } from "../types";
    import Pagination from "./Pagination";

    interface CountryListProps {
    searchFilter: string;
    }

    const CountryList: React.FC<CountryListProps> = ({ searchFilter }) => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [filters, setFilters] = useState<{ filterType: string }>({
        filterType: "",
    });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const countriesPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await fetchCountries();
            setCountries(data);
        } catch (error) {
            console.error("Error fetching countries:", error);
        }
        };

        fetchData();
    }, []);

    const handleSortChange = () => {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        setFilters((prevFilters) => ({ ...prevFilters, filterType: value }));
    };

    const filteredCountries = countries
        .filter((country) => {
        const lithuania = countries.find((c) => c.name === "Lithuania");
        if (filters.filterType === "smallerThanLithuania" && lithuania) {
            return country.area < lithuania.area;
        }
        if (filters.filterType === "inOceania") {
            return country.region === "Oceania";
        }
        return true;
        })
        .filter((country) => {
        const lowerCaseSearchFilter = searchFilter.toLowerCase();
        return (
            country.name.toLowerCase().includes(lowerCaseSearchFilter) ||
            country.region.toLowerCase().includes(lowerCaseSearchFilter)
        );
        });

    const sortedCountries = filteredCountries.sort((a, b) => {
        if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
    });

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = sortedCountries.slice(
        indexOfFirstCountry,
        indexOfLastCountry
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="country-list ">
        <div className=" country-list-top  ">
            <div className="text-heading">
            <h4 className="Heading-text">Uncover the whereabouts of the world!</h4>
            </div>
            <div className="select-filtering">
            <select
                name="filterType"
                value={filters.filterType}
                onChange={handleFilterChange}
            >
                <option value="">All</option>
                <option value="smallerThanLithuania">
                Countries smaller than Lithuania
                </option>
                <option value="inOceania">Countries in Oceania</option>
            </select>
            </div>
        </div>
        <button className="btn" onClick={handleSortChange}>
            Names {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
        <ul className="list-group mt-3">
            {currentCountries.map((country) => (
            <li className="list-group-item" key={country.name}>
                <h5>{country.name}</h5>
                <p>Region: {country.region}</p>
                <p>Area  : {country.area} km²</p>
            </li>
            ))}
        </ul>
        <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(sortedCountries.length / countriesPerPage)}
            onPageChange={handlePageChange}
        />
        </div>
    );
    };

    export default CountryList;
