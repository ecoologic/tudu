import { render, screen, fireEvent } from "@testing-library/react";
import { TShirtSizeSelect } from "./TShirtSizeSelect";
import { tShirtSizes } from "../helpers/types";
import { describe, it, expect, vi } from "vitest";

describe("TShirtSizeSelect", () => {
  const mockRegister = vi.fn();

  it("renders the label and select element", () => {
    render(
      <TShirtSizeSelect
        name="value"
        label="T-Shirt Size"
        defaultValue=""
        register={mockRegister}
      />
    );

    expect(screen.getByLabelText("T-Shirt Size")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders all t-shirt size options", () => {
    render(
      <TShirtSizeSelect
        name="value"
        label="T-Shirt Size"
        defaultValue=""
        register={mockRegister}
      />
    );

    tShirtSizes.forEach(size => {
      expect(screen.getByRole("option", { name: size })).toBeInTheDocument();
    });
  });

  it("calls register on value change", () => {
    render(
      <TShirtSizeSelect
        name="value"
        label="T-Shirt Size"
        defaultValue=""
        register={mockRegister}
      />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: tShirtSizes[0] } });

    expect(mockRegister).toHaveBeenCalled();
  });

  it("sets the default value correctly", () => {
    render(
      <TShirtSizeSelect
        name="value"
        label="T-Shirt Size"
        defaultValue={tShirtSizes[1]}
        register={mockRegister}
      />
    );

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    expect(select.value).toBe(tShirtSizes[1]);
  });
});
