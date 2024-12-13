import React, { useState, useEffect } from "react";
import InputField from "../../../components/ui/InputField";
import TextAreaField from "../../../components/ui/TextAreaField";
import SelectField from "../../../components/ui/SelectField";
import PageTitle from "../../../components/ui/PageTitle";
import { Button } from "../../../components/ui/Button";
import ComplianceTable from "../../../components/tables/ComplianceTable";

interface ComplianceItem {
  id: number;
  regulationType: string;
  description: string;
  dueDate: string;
  status: "Completed" | "Pending" | "Overdue";
  responsiblePerson: string;
  notes: string;
}

const PayrollCompliance: React.FC = () => {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<ComplianceItem | null>(null);
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedItems = localStorage.getItem("payrollComplianceItems");
    if (savedItems) {
      setComplianceItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "payrollComplianceItems",
      JSON.stringify(complianceItems)
    );
  }, [complianceItems]);

  const handleShowModal = (item: ComplianceItem | null) => {
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentItem(null);
  };

  const handleSaveItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const newItem: ComplianceItem = {
      id: currentItem?.id || Date.now(),
      regulationType: (
        form.elements.namedItem("regulationType") as HTMLInputElement
      ).value,
      description: (
        form.elements.namedItem("description") as HTMLTextAreaElement
      ).value,
      dueDate: (form.elements.namedItem("dueDate") as HTMLInputElement).value,
      status: (form.elements.namedItem("status") as HTMLSelectElement)
        .value as ComplianceItem["status"],
      responsiblePerson: (
        form.elements.namedItem("responsiblePerson") as HTMLInputElement
      ).value,
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    if (currentItem) {
      setComplianceItems(
        complianceItems.map((item) =>
          item.id === currentItem.id ? newItem : item
        )
      );
    } else {
      setComplianceItems([...complianceItems, newItem]);
    }

    handleCloseModal();
  };

  const handleDeleteItem = (id: number) => {
    setComplianceItems(complianceItems.filter((item) => item.id !== id));
  };

  const handleBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors({ ...errors, [name]: `${name} is required` });
    } else {
      setErrors({ ...errors, [name]: false });
    }
  };

  return (
    <div className="flex flex-col">
      <PageTitle title="Payroll Compliance Management" />

      <div className="pt-10 p-6 border-[.8px] rounded-xl">
        <div className="flex flex-col w-full ">
          <div className="flex  w-[200px] h-[38px] mb-4">
            <Button
              onClick={() => handleShowModal(null)}
              mode={"solid"}
              buttonText="Add Compliance Item"
              loading={false}
              defaultColor="primary-1"
              hoverColor="primary-2"
            />
          </div>

          <ComplianceTable />

          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                <form onSubmit={handleSaveItem}>
                  <InputField
                    label="Regulation Type"
                    id="regulationType"
                    name="regulationType"
                    value={currentItem?.regulationType || ""}
                    onChange={(e: any) =>
                      setCurrentItem({
                        ...currentItem!,
                        regulationType: e.target.value,
                      })
                    }
                    onBlur={handleBlur}
                    error={errors.regulationType}
                    required
                  />
                  <TextAreaField
                    label="Description"
                    id="description"
                    name="description"
                    value={currentItem?.description || ""}
                    onChange={(e: any) =>
                      setCurrentItem({
                        ...currentItem!,
                        description: e.target.value,
                      })
                    }
                    onBlur={handleBlur}
                    error={errors.description}
                    required
                  />
                  <InputField
                    label="Due Date"
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={currentItem?.dueDate || ""}
                    onChange={(e: any) =>
                      setCurrentItem({
                        ...currentItem!,
                        dueDate: e.target.value,
                      })
                    }
                    onBlur={handleBlur}
                    error={errors.dueDate}
                    required
                  />
                  <SelectField
                    label="Status"
                    id="status"
                    name="status"
                    value={currentItem?.status || ""}
                    options={["Completed", "Pending", "Overdue"]}
                    onChange={(e: any) =>
                      setCurrentItem({
                        ...currentItem!,
                        status: e.target.value as ComplianceItem["status"],
                      })
                    }
                    onBlur={handleBlur}
                    error={errors.status}
                    required
                  />
                  <InputField
                    label="Responsible Person"
                    id="responsiblePerson"
                    name="responsiblePerson"
                    value={currentItem?.responsiblePerson || ""}
                    onChange={(e: any) =>
                      setCurrentItem({
                        ...currentItem!,
                        responsiblePerson: e.target.value,
                      })
                    }
                    onBlur={handleBlur}
                    error={errors.responsiblePerson}
                    required
                  />
                  <TextAreaField
                    label="Notes"
                    id="notes"
                    name="notes"
                    value={currentItem?.notes || ""}
                    onChange={(e: any) =>
                      setCurrentItem({ ...currentItem!, notes: e.target.value })
                    }
                    onBlur={handleBlur}
                    error={errors.notes}
                  />
                  <div className="flex justify-end space-x-2 mt-4">
                    <div className="flex gap-2 w-[308px] h-[38px]">
                      <div className="flex flex-1">
                        <Button
                          onClick={handleCloseModal}
                          mode={"outline"}
                          buttonText="Close"
                          defaultColor="primary-1"
                          hoverColor="primary-2"
                        />
                      </div>
                      <div className="flex flex-1">
                        <Button
                          mode={"solid"}
                          buttonText="Save"
                          loading={isLoading}
                          defaultColor="primary-1"
                          hoverColor="primary-2"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayrollCompliance;
