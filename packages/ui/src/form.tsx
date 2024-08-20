import type * as LabelPrimitive from '@radix-ui/react-label'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@tszhong0411/utils'
import { createContext, forwardRef, useContext, useId, useMemo } from 'react'
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext
} from 'react-hook-form'

import { Label } from './label'

export const Form = FormProvider

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

export const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: ControllerProps<TFieldValues, TName>
) => {
  const context = useMemo(() => ({ name: props.name }), [props.name])

  return (
    <FormFieldContext.Provider value={context}>
      <Controller {...props} />
    </FormFieldContext.Provider>
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

export const FormItem = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const id = useId()

    const context = useMemo(() => ({ id }), [id])

    return (
      <FormItemContext.Provider value={context}>
        <div ref={ref} className={cn('space-y-2', className)} {...rest} />
      </FormItemContext.Provider>
    )
  }
)

export const FormLabel = forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>((props, ref) => {
  const { className, ...rest } = props
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...rest}
    />
  )
})

export const FormControl = forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>((props, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId}
      aria-invalid={!!error}
      {...props}
    />
  )
})

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<'p'>
>((props, ref) => {
  const { className, ...rest } = props
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
})

export const FormMessage = forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<'p'>>(
  (props, ref) => {
    const { className, children, ...rest } = props
    const { error, formMessageId } = useFormField()
    const body = error ? String(error.message) : children

    if (!body) return null

    return (
      <p
        ref={ref}
        id={formMessageId}
        className={cn('text-destructive text-sm font-medium', className)}
        {...rest}
      >
        {body}
      </p>
    )
  }
)

FormItem.displayName = 'FormItem'
FormLabel.displayName = 'FormLabel'
FormControl.displayName = 'FormControl'
FormDescription.displayName = 'FormDescription'
FormMessage.displayName = 'FormMessage'
