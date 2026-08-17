# Accessibility Notes: Handmade Components vs shadcn/ui

## Overview

For this accessibility playground, I first built three interactive components from scratch using React and TypeScript:

* Modal Dialog
* Tabs
* Disclosure

The goal was to understand the keyboard interactions, ARIA attributes, and focus-management behavior required by accessible UI components before comparing my implementation with shadcn/ui.

After completing the handmade components, I installed shadcn/ui and generated its Dialog and Tabs components. The generated components use accessibility primitives underneath while still exposing readable component source in the project.

---

## Modal Dialog

### What I implemented manually

My modal includes:

* `role="dialog"`
* `aria-modal="true"`
* `aria-labelledby`
* Escape key support
* Initial focus when the modal opens
* Tab and Shift + Tab focus trapping
* Focus restoration to the trigger button when the modal closes

To trap focus, I manually query focusable elements inside the dialog and move focus between the first and last elements.

### What shadcn handled more robustly

After reviewing the generated shadcn Dialog component, I noticed several areas where its underlying dialog primitive provides more complete behavior than my handmade implementation.

#### 1. More robust focus management

My implementation manually searches for focusable elements using a CSS selector.

This works for the current example, but a production dialog can contain dynamically added, removed, disabled, hidden, or nested interactive elements.

The dialog primitive used by shadcn provides focus-management behavior as part of the component system rather than requiring manual element queries.

This reduces the risk of focus escaping the dialog or becoming incorrect when the dialog content changes.

#### 2. Portal and overlay handling

My modal is rendered directly where the component appears in the React tree.

The shadcn Dialog implementation uses a portal-based structure for rendering dialog content and its overlay.

This provides a cleaner separation between normal page content and modal content and is more appropriate for reusable production dialogs.

#### 3. Better reusable component structure

My handmade modal combines most behavior inside one component.

The shadcn version separates the dialog into reusable pieces such as:

* Dialog
* DialogTrigger
* DialogContent
* DialogTitle
* DialogDescription
* DialogClose

This makes the API more composable and makes accessibility-related structure easier to reuse consistently.

---

## Tabs

### What I implemented manually

My tabs include:

* `role="tablist"`
* `role="tab"`
* `role="tabpanel"`
* `aria-selected`
* `aria-controls`
* `aria-labelledby`
* Roving `tabIndex`
* ArrowRight navigation
* ArrowLeft navigation
* Home key support
* End key support
* Focus movement when keyboard navigation changes the active tab

The active tab is stored using React state, and an array of button refs is used to move keyboard focus.

### What shadcn handled more robustly

#### 1. Keyboard navigation is abstracted

My implementation manually calculates the next tab index for every keyboard interaction.

The shadcn Tabs component delegates this behavior to its underlying tabs primitive.

This means the component user does not need to recreate arrow-key navigation and focus-management logic every time tabs are used.

#### 2. ARIA relationships are handled consistently

In my version, IDs, `aria-controls`, `aria-labelledby`, `aria-selected`, and `tabIndex` are manually connected.

That gives me useful practice, but it also creates opportunities for mistakes if IDs or state become inconsistent.

The primitive used by shadcn coordinates much of this behavior automatically.

#### 3. Better composition

My handmade version stores the tab configuration in one component.

The shadcn version exposes separate pieces such as:

* Tabs
* TabsList
* TabsTrigger
* TabsContent

This makes it easier to create different layouts while keeping the accessibility behavior consistent.

---

## Disclosure

I did not use a component library for the disclosure because the assignment required building it from scratch.

The implementation uses a native `<button>`, which already supports activation with Enter and Space.

The trigger also uses:

* `aria-expanded`
* `aria-controls`

The controlled content is shown or hidden based on the expanded state.

Using a native button meant I did not need to manually recreate keyboard activation behavior.

---

## Concrete Gaps I Found

The most important gaps between my handmade implementation and the library implementations were:

1. **Focus management in the modal was more manual and fragile in my version.**
   I had to query focusable elements and implement the focus loop myself, while the dialog primitive provides a more robust focus-management system.

2. **My modal did not use a portal-based dialog architecture.**
   The shadcn implementation separates the overlay and dialog content using reusable dialog primitives and portal rendering.

3. **Tabs keyboard navigation required manual index and ref management in my implementation.**
   The tabs primitive abstracts this behavior and reduces the possibility of keyboard-navigation mistakes.

4. **ARIA relationships were manually maintained in my tabs.**
   The component primitive handles much of the relationship between triggers and content consistently.

---

## What I Learned

Building the components manually helped me understand why accessible components require more than adding ARIA attributes.

Accessibility also involves:

* keyboard interaction
* focus movement
* focus restoration
* component state
* correct semantic roles
* relationships between controls and controlled content

The comparison with shadcn/ui showed me why mature accessibility primitives are useful in production applications.

They reduce repeated accessibility logic and handle edge cases more consistently, while the generated shadcn source remains available in the project for review.

The main lesson from this assignment is that I should understand the accessibility pattern first and then use component libraries intentionally rather than assuming generated components are automatically correct for every use case.
