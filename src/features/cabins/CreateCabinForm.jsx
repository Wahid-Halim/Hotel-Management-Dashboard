import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";

import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, getValues, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, updateCabin } = useUpdateCabin();

  const isWorking = isEditing || isCreating;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        {
          <Input
            type="text"
            id="name"
            disabled={isWorking}
            {...register("name", {
              required: "This field is required",
            })}
          />
        }
      </FormRow>

      <FormRow label="Max Capacity" error={errors?.name?.message}>
        {
          <Input
            type="number"
            id="maxCapaciy"
            disabled={isWorking}
            {...register("maxCapaciy", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be at least 1",
              },
            })}
          />
        }
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        {
          <Input
            type="number"
            id="regularPrice"
            disabled={isWorking}
            {...register("regularPrice", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Price should at least 1",
              },
            })}
          />
        }
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        {
          <Input
            type="number"
            id="discount"
            defaultValue={0}
            disabled={isWorking}
            {...register("discount", {
              required: "This field is required",
              validate: (value) =>
                value <= getValues().regularPrice ||
                "Discount should be less than regular price",
            })}
          />
        }
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        {
          <Textarea
            type="number"
            id="description"
            disabled={isWorking}
            defaultValue=""
            {...register("description", {
              required: "This field is required",
            })}
          />
        }
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button type="reset" size="medium" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button size="medium" variation="primary" disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
