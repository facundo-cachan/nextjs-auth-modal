import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import removeFromArray from "utils/removeFromArray";

describe("Util removeFromArray", () => {
    it("Testing", async () => {
        await waitFor(() => {
            expect(removeFromArray([
                { id: 1, value: "valueOne" },
                { id: 2, value: "valueTwo" },
                { id: 3, value: "valueThree" }
            ], 2)).toHaveLength(2);
        })
    })
});
