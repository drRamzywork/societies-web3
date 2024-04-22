"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Map from "@/components/Map";

export default function Home() {
  const [societiesListSocieties, setSocietiesListSocieties] = useState([]);

  useEffect(() => {
    const fetchAllSocietiesListSocieties = async () => {
      try {
        const response = await fetch(
          "https://map.rmz.one/api/list-regions-with-societies"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSocietiesListSocieties(data.data.data); // Set the fetched data into state
      } catch (error) {
        console.error("Failed to fetch AllSocietiesList:", error);
      }
    };

    fetchAllSocietiesListSocieties();
  }, []);

  console.log(societiesListSocieties, "societiesListSocieties");

  return (
    <main className={styles.main}>
      {" "}
      <Map societiesListSocieties={societiesListSocieties} />{" "}
    </main>
  );
}
