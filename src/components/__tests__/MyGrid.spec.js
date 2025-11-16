import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/vue";

// component
import MyGrid from "@/components/MyGrid.vue";

import { Data } from "./MyGrid.mockdata";

describe("MyGrid", () => {
  let server;
  beforeEach(() => {});
  afterEach(() => {
    vi.clearAllMocks();
    server?.resetHandlers();
    server?.close();
  });
  describe("1. Initial render", () => {
    it("Should render the grid with rows and column", async () => {
        const gridData = Data("get_1");
        server = setupServer(
          http.get("https://dummyjson.com/products", (req, res, ctx) => {
            return HttpResponse.json(gridData);
          })
        );
        server.events.on("request:start", ({ request }) => {
          console.log("MSW intercepted:", request.method, request.url);
        });
        server.listen();
        
        render(MyGrid);
        
        // Wait for the component to load and make the API call
        await waitFor(() => {
          expect(screen.queryByText("Loading products...")).toBeNull();
        });
        
        // Check that the table is rendered
        const table = await waitFor(() => {
            return screen.getByRole("table");
          }, { timeout: 5000 });
          expect(table).toBeTruthy();
  
        expect(table).toBeTruthy();
        
        // Check that the table has the expected column headers
        expect(screen.getByRole("columnheader", { name: "ID" })).toBeTruthy();
        expect(screen.getByRole("columnheader", { name: "Image" })).toBeTruthy();
        expect(screen.getByRole("columnheader", { name: "Title" })).toBeTruthy();
        expect(screen.getByRole("columnheader", { name: "Category" })).toBeTruthy();
        expect(screen.getByRole("columnheader", { name: "Brand" })).toBeTruthy();
        expect(screen.getByRole("columnheader", { name: "Price" })).toBeTruthy();
        expect(screen.getByRole("columnheader", { name: "Discount" })).toBeTruthy();
        expect(screen.getByRole("columnheader", { name: "Rating" })).toBeTruthy();
        expect(screen.getByRole("columnheader", { name: "Stock" })).toBeTruthy();
        expect(screen.getByRole("columnheader", { name: "Description" })).toBeTruthy();
        
        // Check that data rows are rendered (should have 31 products from mock data)
        const rows = screen.getAllByRole("row");
        // +1 for header row
        expect(rows).toHaveLength(31);
        
        const firstDataRow = rows[1]; // First product row
        const secondDataRow = rows[2]; // Second product row

        // Check first row title
        const firstRowTitleCell = within(firstDataRow).getByRole("cell-title");
        expect(firstRowTitleCell).toHaveTextContent("Essence Mascara Lash Princess"); // Title


        // Check second row title
        const secondRowTitleCell = within(secondDataRow).getByRole("cell-title");
        expect(secondRowTitleCell).toHaveTextContent("Eyeshadow Palette with Mirror"); // Title
      });
  });
});