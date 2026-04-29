---
name: GAPA
description: Plataforma de membresia con campus, sesiones y acompanamiento emocional guiado.
colors:
  primary-green: "#2F6B45"
  primary-green-soft: "#E4EFE7"
  trust-blue: "#436B93"
  trust-blue-soft: "#E7EEF5"
  action-red: "#B91C1C"
  neutral-bg: "#F5F5F5"
  neutral-surface: "#FCFCFA"
  neutral-panel: "#EEF1EC"
  neutral-border: "#D6DDD4"
  neutral-text: "#243127"
  neutral-muted: "#617066"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.05
  headline:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "1.35rem"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: "12px"
  md: "18px"
  lg: "28px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.action-red}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.md}"
    padding: "14px 20px"
  button-secondary:
    backgroundColor: "{colors.primary-green-soft}"
    textColor: "{colors.primary-green}"
    rounded: "{rounded.md}"
    padding: "14px 20px"
  card:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: GAPA

## Overview

**Creative North Star: "La sala serena"**

GAPA debe sentirse como una plataforma de acompanamiento estable, clara y emocionalmente segura. La interfaz no busca impresionar con artificios, sino sostener con orden, legibilidad y una sensacion de calma inmediata. La experiencia tiene que ser predecible, respirada y confiable, especialmente para personas que pueden llegar con ansiedad o sobrecarga.

Es un sistema visual de producto, no editorial ni promocional. La prioridad es que el usuario entienda donde esta, que puede hacer ahora y por que cada parte existe. El tono visual combina calidez humana con estructura profesional: verdes para contencion, azules para confianza institucional y una base de grises suaves que den respiro.

**Key Characteristics:**
- Jerarquia clara, sin estridencias
- Superficies limpias, con bordes suaves y poca profundidad
- Tipografia clasica en titulos, interfaz funcional en cuerpo
- Color usado con disciplina, nunca como ruido
- Acciones primarias visibles, pocas y consistentes

## Colors

La paleta trabaja desde la calma y la confianza, con color funcional en lugar de decorativo.

### Primary
- **Verde de contencion** (#2F6B45): color principal para navegacion activa, etiquetas clave, enfasis sereno y senales de progreso.
- **Verde de apoyo** (#E4EFE7): fondos suaves para estados destacados, bloques de contexto y ayudas no invasivas.

### Secondary
- **Azul de confianza** (#436B93): refuerzo institucional para contenido profesional, metadatos relevantes y capas de apoyo.
- **Azul de apoyo** (#E7EEF5): fondos secundarios donde hace falta separar contenido sin endurecer la interfaz.

### Tertiary
- **Rojo de accion** (#B91C1C): reservado a CTAs y enfasis puntual. Nunca domina una pantalla ni aparece como fondo amplio.

### Neutral
- **Gris de base** (#F5F5F5): fondo principal de aplicacion.
- **Marfil de superficie** (#FCFCFA): cards, paneles y formularios.
- **Gris de panel** (#EEF1EC): capas secundarias, barras y bloques de apoyo.
- **Borde suave** (#D6DDD4): divisores, contornos y estructura.
- **Texto principal** (#243127): lectura principal.
- **Texto secundario** (#617066): apoyo, metadata y copy de menor prioridad.

### Named Rules
**The Five Percent Red Rule.** El rojo solo vive en llamadas a la accion o enfasis puntuales. Si empieza a dominar visualmente, ya esta mal usado.

## Typography

**Display Font:** Georgia, Times New Roman, serif  
**Body Font:** Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif  
**Label/Mono Font:** Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif

**Character:** los titulos tienen una gravedad humana y confiable. El cuerpo y la interfaz deben sentirse cercanos, legibles y funcionales, sin tecnicismos visuales ni gestos demasiado de marca.

### Hierarchy
- **Display** (700, 3rem, 1.05): hero y aperturas principales.
- **Headline** (700, 2rem, 1.15): encabezados de seccion y paneles principales.
- **Title** (700, 1.35rem, 1.2): subtitulos de cards y modulos.
- **Body** (400, 1rem, 1.6): texto principal y explicaciones, idealmente entre 65 y 75 caracteres por linea.
- **Label** (700, 0.85rem, 0.08em): eyebrow, labels y pequenos indicadores de estructura.

### Named Rules
**The Predictable Reading Rule.** La tipografia nunca debe competir con la tarea. Si un bloque llama mas la atencion por estilo que por contenido, hay exceso.

## Elevation

La profundidad de GAPA es baja. El sistema se apoya principalmente en capas tonales, contornos suaves y una sombra muy liviana para separar modulos. Nada debe sentirse flotando agresivamente ni vidrio sobre vidrio.

### Shadow Vocabulary
- **Surface Lift** (`0 10px 30px rgba(36, 49, 39, 0.05)`): cards principales y paneles destacados.
- **Soft Edge** (`0 2px 10px rgba(36, 49, 39, 0.03)`): micro separacion en formularios o chips contextuales.

### Named Rules
**The Flat-First Rule.** La interfaz descansa casi plana. La elevacion aparece solo para ordenar, no para decorar.

## Components

### Buttons
- **Shape:** redondeado amable (18px)
- **Primary:** rojo de accion con texto claro, reservado a avanzar o confirmar
- **Hover / Focus:** cambio sutil de tono y contorno visible, sin efectos dramaticos
- **Secondary / Ghost:** fondos verdes o transparentes con borde suave para acciones de apoyo

### Chips
- **Style:** fondos verdes o grises suaves con texto de alto contraste
- **State:** activo con color mas presente, inactivo con baja saturacion

### Cards / Containers
- **Corner Style:** 28px
- **Background:** marfil de superficie o gris de panel
- **Shadow Strategy:** minima, con prioridad en borde y contraste tonal
- **Border:** siempre suave, nunca duro
- **Internal Padding:** 24px como base

### Inputs / Fields
- **Style:** fondos claros, contorno suave, gran area clickeable
- **Focus:** borde verde o azul con ring leve
- **Error / Disabled:** claros y sin dramatismo visual

### Navigation
- **Style:** clara, silenciosa y estructural. La navegacion activa debe sentirse acompanada, no gritona.

## Do's and Don'ts

### Do:
- **Do** usar Georgia para titulos y Calibri para interfaz y cuerpo.
- **Do** mantener fondos base en torno a #F5F5F5 y superficies claras respiradas.
- **Do** apoyar la calma en verdes y la confianza en azules, con roles consistentes.
- **Do** usar pocas acciones primarias por pantalla.
- **Do** dejar espacio entre bloques para bajar carga cognitiva.

### Don't:
- **Don't** convertir la plataforma en una senal de alerta o un sitio de emergencias.
- **Don't** usar el rojo (#B91C1C) como fondo dominante ni en superficies grandes.
- **Don't** saturar la pantalla con contrastes agresivos, pop-ups invasivos o bloques amontonados.
- **Don't** usar tipografias distintas de Georgia y Calibri para romper la identidad.
- **Don't** deformar, estirar o aplicar sombras y brillos al logo de GAPA.
- **Don't** volver la experiencia fria, distante o puramente clinica.
