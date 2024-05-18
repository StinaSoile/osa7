import axios from "axios";
import React, { useState, useEffect } from "react";


export const useCountry = (name) => {
    const [country, setCountry] = useState(null);
    const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";

    useEffect(() => {
        getCountry(name)
    }, [name]);

    const getCountry = async () => {
        if (name.trim() === '') {
            setCountry(null)
            return
        }
        let found = false
        const countryLowerCase = name.trim().toLowerCase();
        try {
            const response = await axios.get(`${baseUrl}name/${countryLowerCase}`);
            found = true
            // console.log(response.data)
            const data = {
                name: response.data.name.common,
                capital: response.data.capital,
                population: response.data.population,
                flag: response.data.flags.png
            }

            setCountry({ found, data })

        } catch (error) {
            found = false
            setCountry({ found, data: null })
            return
        }



    };

    return country;
};