import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "./Searchbox";

describe("SearchBox", () => {
    it("muestra el campo de búsqueda", () => {
        render(
            <SearchBox
                search=""
                setSearch={() => {}}
            />
        );

        const input = screen.getByPlaceholderText("Buscar...");

        expect(input).toBeInTheDocument();
    });

    it("actualiza la búsqueda cuando el usuario escribe", () => {
        const setSearch = vi.fn();

        render(
            <SearchBox
                search=""
                setSearch={setSearch}
            />
        );

        const input = screen.getByPlaceholderText("Buscar...");

        fireEvent.change(input, {
            target: { value: "Samsung" }
        });

        expect(setSearch).toHaveBeenCalledWith("Samsung");
    });
});