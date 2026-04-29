---
name: GAPA
description: Plataforma de membresia con campus, sesiones y acompanamiento emocional guiado.
colors:
  primary-green-dark: "#0F2D23"
  primary-green: "#2F6B3E"
  primary-green-light: "#6FBF73"
  trust-blue-dark: "#0B1F2D"
  trust-blue: "#2F80ED"
  trust-blue-light: "#6FAFE7"
  action-red: "#B91C1C"
  neutral-bg: "#F5F5F5"
  neutral-surface: "#FCFCFA"
  neutral-border: "#D6DDD4"
  neutral-text: "#111418"
  neutral-muted: "#6B6B6B"
typography:
  display:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "44px"
    fontWeight: 700
    lineHeight: 1.05
  headline:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: 1.15
  title:
    fontFamily: "Georgia, Times New Roman, serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: 1.2
  body:
    fontFamily: "Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif"
    fontSize: "10px"
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
    backgroundColor: "{colors.primary-green-light}"
    textColor: "{colors.primary-green-dark}"
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

Es un sistema visual de producto, no editorial ni promocional. La prioridad es que el usuario entienda donde esta, que puede hacer ahora y por que cada parte existe. El tono visual combina calidez humana con estructura profesional: 50% de verdes para base emocional, 30% de azules para confianza institucional, 15% de neutros para estructura y tipografia, y 5% de rojo para accion puntual.

**Key Characteristics:**
- Jerarquia clara, sin estridencias
- Superficies limpias, con bordes suaves y poca profundidad
- Tipografia clasica en titulos, interfaz funcional en cuerpo
- Color usado con disciplina, nunca como ruido
- Acciones primarias visibles, pocas y consistentes

## Colors

La paleta trabaja desde la calma y la confianza, con color funcional en lugar de decorativo.

### Primary
- **Verde Oscuro** (#0F2D23): base principal, anclaje emocional y uso institucional fuerte.
- **Verde Medio** (#2F6B3E): navegacion activa, jerarquia principal y soporte de calma.
- **Verde Claro** (#6FBF73): acentos positivos, estados suaves y apoyo visual.

### Secondary
- **Azul Oscuro** (#0B1F2D): base institucional y capas de mayor seriedad.
- **Azul Francia** (#2F80ED): indicadores, enlaces, recursos profesionales y apoyo UI.
- **Azul Claro** (#6FAFE7): fondos informativos y separacion suave.

### Tertiary
- **Rojo Acento** (#B91C1C): reservado a CTAs, palabras clave y enfasis puntual. Nunca domina una pantalla ni aparece como fondo amplio.

### Neutral
- **Gris Fondo** (#F5F5F5): fondo principal de aplicacion.
- **Marfil de superficie** (#FCFCFA): cards, paneles y formularios.
- **Borde suave** (#D6DDD4): divisores, contornos y estructura.
- **Texto principal** (#111418): lectura principal.
- **Texto secundario** (#6B6B6B): apoyo, metadata y copy de menor prioridad.

### Named Rules
**The Five Percent Red Rule.** El rojo solo vive en llamadas a la accion o enfasis puntuales. Si empieza a dominar visualmente, ya esta mal usado.

## Typography

**Display Font:** Georgia, Times New Roman, serif  
**Body Font:** Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif  
**Label/Mono Font:** Calibri, Candara, Segoe, Segoe UI, Optima, Arial, sans-serif

**Character:** los titulos tienen gravedad humana y confianza. El cuerpo y la interfaz deben sentirse cercanos, legibles y funcionales.

### Hierarchy
- **Display** (700, 36px a 44px, 1.05): hero y aperturas principales.
- **Headline** (700, 28px a 32px, 1.15): encabezados de seccion y paneles principales.
- **Title** (700, 20px a 24px, 1.2): subtitulos de cards y modulos.
- **Body** (400, 14px a 16px, 1.6): texto principal y explicaciones, idealmente entre 65 y 75 caracteres por linea.
- **Label** (700, 8px a 10px, 0.08em): eyebrow, labels y pequenos indicadores de estructura.

### Named Rules
**The Strict Typeface Rule.** Titulos solo con Georgia. Cuerpo y UI solo con Calibri. No se introducen familias nuevas.

## Elevation

La profundidad de GAPA es baja. El sistema se apoya principalmente en capas tonales, contornos suaves y una sombra muy liviana para separar modulos. Nada debe sentirse flotando agresivamente ni vidrio sobre vidrio.

### Shadow Vocabulary
- **Surface Lift** (`0 10px 30px rgba(17, 20, 24, 0.05)`): cards principales y paneles destacados.
- **Soft Edge** (`0 2px 10px rgba(17, 20, 24, 0.03)`): micro separacion en formularios o chips contextuales.

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
- **Background:** superficies claras y neutras
- **Shadow Strategy:** minima, con prioridad en borde y contraste tonal
- **Border:** siempre suave, nunca duro
- **Internal Padding:** 24px como base

### Inputs / Fields
- **Style:** fondos claros, contorno suave, gran area clickeable
- **Focus:** borde verde o azul con ring leve
- **Error / Disabled:** claros y sin dramatismo visual

### Navigation
- **Style:** clara, silenciosa y estructural. La navegacion activa debe sentirse acompanada, no gritona.

### Logo
- **Concepto:** isotipo de cuatro figuras humanas formando un corazon, con gradiente verde-azul como sintesis de calma y confianza.
- **Regla:** siempre mantener proporciones originales, zona de respeto y contraste suficiente.
- **Minimo digital:** 80px de ancho.

## Do's and Don'ts

### Do:
- **Do** usar Georgia para titulos y Calibri para interfaz y cuerpo.
- **Do** respetar la proporcion general 50% verdes, 30% azules, 15% neutros, 5% rojo.
- **Do** mantener fondos base en torno a #F5F5F5 y superficies claras respiradas.
- **Do** apoyar la calma en verdes y la confianza en azules, con roles consistentes.
- **Do** usar pocas acciones primarias por pantalla.
- **Do** dejar espacio entre bloques para bajar carga cognitiva.
- **Do** mantener el logo en proporcion original, con contraste y sin efectos.

### Don't:
- **Don't** convertir la plataforma en una senal de alerta o un sitio de emergencias.
- **Don't** usar el rojo (#B91C1C) como fondo dominante ni en superficies grandes.
- **Don't** saturar la pantalla con contrastes agresivos, pop-ups invasivos o bloques amontonados.
- **Don't** usar tipografias distintas de Georgia y Calibri para romper la identidad.
- **Don't** deformar, estirar o aplicar sombras y brillos al logo de GAPA.
- **Don't** cambiar los colores originales del isotipo o del wordmark.
- **Don't** volver la experiencia fria, distante o puramente clinica.
