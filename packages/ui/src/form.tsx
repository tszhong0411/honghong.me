import type * as LabelPrimitive from '@radix-ui/react-label'

import { Slot } from '@radix-ui/react-slot'
import { cn } from '@tszhong0411/utils'
import { createContext, useContext, useId, useMemo } from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext
} from 'react-hook-form'

import { Label } from './label'

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

type FormItemContextValue = {
  id: string
}

const FormFieldContext = createContext<FormFieldContextValue | undefined>(undefined)
const FormItemContext = createContext<FormItemContextValue | undefined>(undefined)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: ControllerProps<TFieldValues, TName>
) => {
  const { name } = props

  const context = useMemo(() => ({ name }), [name])

  return (
    <FormFieldContext value={context}>
      <Controller {...props} />
    </FormFieldContext>
  )
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext || !itemContext) {
    throw new Error('useFormField must be used within a FormField and FormItem')
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}

type FormItemProps = React.ComponentProps<'div'>

const FormItem = (props: FormItemProps) => {
  const { className, ...rest } = props
  const id = useId()

  const context = useMemo(() => ({ id }), [id])

  return (
    <FormItemContext value={context}>
      <div className={cn('space-y-2', className)} {...rest} />
    </FormItemContext>
  )
}

type FormLabelProps = React.ComponentProps<typeof LabelPrimitive.Root>

const FormLabel = (props: FormLabelProps) => {
  const { className, ...rest } = props
  const { error, formItemId } = useFormField()

  return (
    <Label className={cn(error && 'text-destructive', className)} htmlFor={formItemId} {...rest} />
  )
}

type FormControlProps = React.ComponentProps<typeof Slot>

const FormControl = (props: FormControlProps) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={!!error}
      {...props}
    />
  )
}

type FormDescriptionProps = React.ComponentProps<'p'>

const FormDescription = (props: FormDescriptionProps) => {
  const { className, ...rest } = props
  const { formDescriptionId } = useFormField()

  return (
    <p
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
}

type FormMessageProps = React.ComponentProps<'p'>

const FormMessage = (props: FormMessageProps) => {
  const { className, children, ...rest } = props
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message) : children

  if (!body) return null

  return (
    <p
      id={formMessageId}
      className={cn('text-destructive text-sm font-medium', className)}
      {...rest}
    >
      {body}
    </p>
  )
}

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage }
