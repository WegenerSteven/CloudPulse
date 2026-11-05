## CloudPulse — Cloud Infrastructure Monitoring Dashboard

**Document version:** 1.0  
**Date:** 5 November 2026  
**Project type:** Frontend capstone / simulated cloud operations dashboard  
**Implementation deadline:** 6 November 2026  
**Primary platform:** Responsive web application  
**Status:** MVP specification — deadline-driven scope

---

## 1. Introduction

### 1.1 Purpose

This document defines the functional requirements, non-functional requirements, user experience, architecture, data contracts, implementation constraints, and acceptance criteria for **CloudPulse**, a frontend-only cloud infrastructure monitoring dashboard.

It is intended to be used as the primary implementation brief by a coding agent. The agent must follow this document, prioritize a working end-to-end MVP, and avoid adding features that threaten delivery before the deadline.

### 1.2 Product overview

CloudPulse is a web-based operations dashboard that presents a consolidated view of simulated cloud infrastructure. It allows a technical operator to:

- Review infrastructure health at a glance.
- Inspect a fleet of virtual servers and their resource utilization.
- View CPU, memory, disk, and network metrics over time.
- Monitor application/service availability.
- Investigate, acknowledge, and resolve operational alerts.
- Experience simulated metric updates without connecting to a real cloud provider.

**Important:** CloudPulse is a frontend capstone. All infrastructure metrics, servers, services, alerts, and events are simulated. The application must not imply that it is monitoring real cloud resources.

### 1.3 Problem statement

Technical teams need a clear way to observe infrastructure health, resource consumption, service availability, and operational incidents. Scattered metrics make it harder to identify unhealthy resources and understand what requires attention.

CloudPulse demonstrates how a centralized monitoring interface can organize this information and support basic operational workflows.

### 1.4 Goals

1. Deliver a polished, responsive, professional dashboard.
2. Demonstrate React and TypeScript fundamentals through reusable components and typed data.
3. Present meaningful infrastructure KPIs and visualizations.
4. Provide usable server, service, and alert management screens.
5. Demonstrate state management, filtering, derived data, persistence, and simulated dynamic updates.
6. Deploy a stable application that can be demonstrated during assessment.

### 1.5 Out of scope

The following are explicitly excluded from the deadline MVP:

- Real AWS, Azure, or Google Cloud integration.
- Real server provisioning, shutdown, restart, or remote administration.
- Kubernetes cluster management.
- Real authentication, authorization, or multi-tenant accounts.
- Backend APIs or database infrastructure.
- WebSocket or production telemetry ingestion.
- Real incident notification delivery (email, SMS, Slack, etc.).
- Billing, subscriptions, or user management.
- AI-based anomaly detection.
- Claims of real-world uptime or infrastructure status.

Do not build these features unless all required MVP acceptance criteria are complete and verified.

---

## 2. Users and use cases

### 2.1 Primary user

**Infrastructure operator / DevOps engineer**

A technical user who needs to inspect infrastructure status, identify resource pressure, and review operational alerts.

### 2.2 Secondary user

**Developer / IT administrator**

A user who wants to inspect service availability, view resource utilization, and understand whether an environment is healthy.

### 2.3 Key use cases

| ID | Use case | Expected result |
| --- | --- | --- |
| UC-01 | View infrastructure overview | User sees fleet health, KPI cards, charts, and recent activity |
| UC-02 | Browse servers | User sees a searchable and filterable server inventory |
| UC-03 | Inspect a server | User opens a server detail view with configuration and metrics |
| UC-04 | Review performance | User selects a time range and views metric charts |
| UC-05 | Review alerts | User sees active and resolved alerts |
| UC-06 | Resolve an alert | User changes an alert's status and the UI updates |
| UC-07 | Monitor services | User sees service health and response times |
| UC-08 | Observe simulated updates | User sees metrics change periodically without reloading |
| UC-09 | Change preferences | User can toggle supported interface preferences |

---

## 3. Product scope and navigation

### 3.1 Application shell

The application must use a consistent dashboard shell on all main routes.

**Desktop layout**

- Fixed or sticky left sidebar, approximately 240–260px wide.
- Main content area fills the remaining width.
- Top header within the main content area.
- Main page content uses a consistent spacing system.
- Sidebar may collapse to an icon rail if time permits.

**Mobile layout**

- Sidebar becomes a drawer or compact navigation.
- Header remains accessible.
- Tables must remain usable through horizontal scrolling or responsive row/card treatment.
- KPI cards and charts stack vertically.
- No horizontal page overflow.

### 3.2 Main navigation

Use these navigation items:

1. Overview — `/`
2. Servers — `/servers`
3. Monitoring — `/monitoring`
4. Alerts — `/alerts`
5. Services — `/services`
6. Settings — `/settings` (optional if time is limited)

The active route must be visually distinguishable. Navigation links must work; do not leave decorative or non-functional menu items.

### 3.3 Global header

Include:

- Page title or breadcrumb.
- Search entry point if implemented consistently.
- Simulated live-data indicator, clearly labelled as demo/simulated.
- Notification/alert shortcut.
- User/avatar placeholder labelled as a demo account.
- Theme toggle only if implemented fully.

Avoid implementing a fake sign-in flow. The application can open directly into a demo dashboard.

---

## 4. Functional requirements

Requirements are prioritized:

- **P0:** Required for submission.
- **P1:** Important if time permits.
- **P2:** Optional enhancement.

### 4.1 Overview dashboard

**Description:** The overview is the landing page and must communicate infrastructure health immediately.

#### P0 requirements

- Display total server count.
- Display healthy server count.
- Display warning server count.
- Display critical/offline server count.
- Display average CPU utilization.
- Display average memory utilization.
- Display overall simulated availability/uptime indicator.
- Display a CPU and memory trend chart.
- Display a recent alerts or activity section.
- Display a server health summary.
- Display a visible “Simulated data” or “Demo environment” label.

#### KPI cards

Recommended cards:

1. Total Servers
2. Healthy Servers
3. Average CPU
4. Average Memory
5. Active Alerts
6. Simulated Availability

Each card should contain:

- Label.
- Main value.
- Supporting context where useful.
- Small icon.
- Status or trend treatment only when supported by the data.

KPI values must be calculated from the shared data source. Do not hardcode totals separately from the server and alert datasets.

#### Charts

At minimum:

- CPU utilization over time.
- Memory utilization over time.

Use Recharts. Charts must have:

- Clear title and units.
- Responsive sizing.
- Tooltip on hover.
- Readable axes and legends where appropriate.
- Empty state if there is no data.

#### Recent activity

Show a short list of recent events, such as:

- CPU threshold exceeded.
- Server returned to healthy state.
- Alert resolved.
- Service response time increased.

Activity may be derived from mock alert and event data. Label it as simulated.

### 4.2 Server inventory

**Route:** `/servers`

#### P0 requirements

- Display a table of mock servers.
- Include server name, region, IP address, operating system, CPU, memory, disk, and status.
- Search by server name or IP address.
- Filter by server status.
- Show a clear empty state when filters return no results.
- Provide a way to open a server details view.
- Use status badges with text, not color alone.

#### Suggested columns

| Column | Description |
| --- | --- |
| Server | Name and optional identifier |
| Region | Simulated cloud region |
| IP Address | Documentation/example IP |
| Operating System | OS label |
| CPU | Percentage |
| Memory | Percentage |
| Disk | Percentage |
| Status | Healthy, Warning, Critical, Offline |
| Action | View details |

Use reserved documentation IP ranges such as `192.0.2.10`, `198.51.100.12`, and `203.0.113.20` rather than real public IPs.

#### Server detail view

**Route:** `/servers/:serverId`

Show:

- Server name and status.
- Server ID.
- Region.
- IP address.
- Operating system.
- CPU, memory, and disk usage.
- Uptime (simulated).
- CPU and memory trend charts.
- Network in/out metrics if available.
- Related active alerts.

If the server ID does not exist, show a not-found state with a link back to the server list.

Do not implement actual server control actions. Buttons such as Restart or Stop must not appear unless they are clearly disabled and labelled as unavailable in this demo. Prefer not to include them.

### 4.3 Performance monitoring

**Route:** `/monitoring`

#### P0 requirements

- Display resource metric charts.
- Support selectable time ranges: `1h`, `24h`, `7d`.
- Include CPU, memory, and network metrics.
- Show units on chart labels.
- Update charts when the selected range changes.
- Make the selected range visually clear.

The mock dataset may provide a different number of points for each time range. It does not need to represent real telemetry.

#### Metric definitions

- CPU: percentage from 0 to 100.
- Memory: percentage from 0 to 100.
- Disk: percentage from 0 to 100.
- Network In: MB/s or Mbps; choose one unit and use it consistently.
- Network Out: MB/s or Mbps; choose one unit and use it consistently.

Do not mix units on the same chart.

### 4.4 Alert management

**Route:** `/alerts`

#### P0 requirements

- Display alerts in a list or table.
- Show alert title, description, affected server, severity, status, and timestamp.
- Support severity filters: Critical, Warning, Info.
- Support status filters: Active, Resolved.
- Allow an active alert to be resolved.
- Persist resolved alert state using LocalStorage.
- Show an empty state when no alerts match the filters.
- Update active-alert counts elsewhere in the app after resolution.

#### Severity and status

Severity:

- `critical`
- `warning`
- `info`

Status:

- `active`
- `resolved`

Use text labels alongside color:

- Critical: red.
- Warning: amber/orange.
- Info: blue.
- Resolved: neutral/green.

#### Alert interaction

When the user resolves an alert:

1. Update the alert state.
2. Update the interface immediately.
3. Persist the changed alert state.
4. Update dashboard active-alert totals.
5. Provide a brief confirmation toast or inline feedback.

The user must not be able to resolve an already resolved alert again.

### 4.5 Services monitoring

**Route:** `/services`

#### P0 requirements

- Display a list or grid of monitored services.
- Show service name.
- Show service type or description.
- Show status: Operational, Degraded, or Outage.
- Show simulated response time.
- Show simulated availability.
- Show last checked time.
- Provide status filtering if time permits.

Example services:

- API Gateway
- Authentication Service
- Payments Service
- Notification Service
- Database Service
- File Storage Service

These are fictional services within the demo environment.

### 4.6 Settings

**Route:** `/settings`

**Priority:** P1/P2.

If implemented, include only working settings:

- Theme preference (light/dark).
- Metric refresh interval (e.g. 5 seconds or 10 seconds).
- Notification display preference.

Persist preferences in LocalStorage.

Do not build a profile editor, account security page, or notification delivery integration for this capstone.

### 4.7 Simulated live metrics

**Priority:** P1, but recommended if core screens are complete.

Implement a small simulation service that updates metric values periodically.

Requirements:

- Use a React effect or a dedicated hook/service with proper cleanup.
- Do not create multiple uncontrolled intervals.
- Update values within valid ranges.
- Keep values reasonably stable; avoid completely random jumps on every tick.
- Update charts and KPI values from the same source of truth.
- Display a “Simulated live data” indicator.
- Allow the simulation to be paused if straightforward to implement.

Example behavior:

- CPU changes gradually by a few percentage points.
- Memory changes gradually.
- Network traffic fluctuates.
- A threshold crossing may create one alert, but repeated duplicate alerts must be prevented.

If this feature risks destabilizing the application, use static mock data and finish the required screens first.

---

## 5. Data model and TypeScript contracts

Create shared TypeScript types. Avoid `any`. Keep data contracts in a dedicated `types` directory.

### 5.1 Server

```typescript
export type ServerStatus =
  | "healthy"
  | "warning"
  | "critical"
  | "offline";

export interface Server {
  id: string;
  name: string;
  region: string;
  ipAddress: string;
  operatingSystem: string;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  status: ServerStatus;
  uptime: number;
  lastCheckedAt: string;
}
```

### 5.2 Alert

```typescript
export type AlertSeverity = "critical" | "warning" | "info";
export type AlertStatus = "active" | "resolved";

export interface Alert {
  id: string;
  serverId: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  createdAt: string;
  resolvedAt?: string;
}
```

### 5.3 Metric

```typescript
export interface Metric {
  timestamp: string;
  cpu: number;
  memory: number;
  disk?: number;
  networkIn: number;
  networkOut: number;
}
```

### 5.4 Service

```typescript
export type ServiceStatus = "operational" | "degraded" | "outage";

export interface MonitoredService {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
  responseTimeMs: number;
  availability: number;
  lastCheckedAt: string;
}
```

### 5.5 Activity event

```typescript
export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  type: "alert" | "server" | "service" | "system";
  createdAt: string;
}
```

### 5.6 Data quality rules

- All IDs must be unique.
- Percentages must be between 0 and 100.
- Uptime and availability must use consistent units and formatting.
- Timestamps should be ISO 8601 strings.
- Every alert's `serverId` should refer to an existing server unless the alert is explicitly system-wide.
- Derived dashboard totals must come from the datasets.
- Use realistic but fictional sample data.
- Do not use actual credentials, secrets, or sensitive infrastructure details.

---

## 6. Architecture and design

### 6.1 High-level architecture

The MVP uses a frontend-only architecture:

```text
                    USER
                      |
                      v
             React Application
                      |
          +-----------+-----------+
          |                       |
          v                       v
    React Router             Shared Layout
          |                       |
          +-----------+-----------+
                      |
                      v
                 Page Modules
          +-----------+-----------+
          |           |           |
          v           v           v
      Dashboard    Servers      Alerts
          |           |           |
          +-----------+-----------+
                      |
                      v
             Shared UI Components
                      |
                      v
             Hooks / State Store
                      |
          +-----------+-----------+
          |                       |
          v                       v
     Data Services          LocalStorage
          |
          v
      Mock JSON Data
```

### 6.2 Architectural principles

1. **Component-based:** Break the UI into small reusable components.
2. **Separation of concerns:** Keep pages, components, data, types, hooks, and utilities separate.
3. **Single source of truth:** Shared server and alert data must not be duplicated across pages.
4. **Typed contracts:** Use TypeScript interfaces for data and component props.
5. **Derived values:** Calculate totals and averages from data rather than hardcoding them.
6. **Graceful states:** Every data-driven screen should consider loading, empty, and error states where appropriate.
7. **Responsive by default:** Use responsive layouts rather than building a desktop-only UI.
8. **Deadline discipline:** Prefer a complete, coherent MVP over many unfinished features.

### 6.3 Recommended project structure

Adapt the structure to the existing repository if one already exists. Do not overwrite existing project configuration without inspecting it first.

```text
cloudpulse-dashboard/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── MobileNavigation.tsx
│   │   ├── common/
│   │   │   ├── PageHeader.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── LoadingState.tsx
│   │   │   └── ErrorState.tsx
│   │   ├── dashboard/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── ResourceTrendChart.tsx
│   │   │   ├── ServerHealthSummary.tsx
│   │   │   └── RecentActivity.tsx
│   │   ├── servers/
│   │   │   ├── ServerTable.tsx
│   │   │   ├── ServerFilters.tsx
│   │   │   └── ServerResourceBars.tsx
│   │   ├── alerts/
│   │   │   ├── AlertTable.tsx
│   │   │   └── AlertFilters.tsx
│   │   └── services/
│   │       └── ServiceCard.tsx
│   ├── pages/
│   │   ├── DashboardPage.tsx
│   │   ├── ServersPage.tsx
│   │   ├── ServerDetailsPage.tsx
│   │   ├── MonitoringPage.tsx
│   │   ├── AlertsPage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── SettingsPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── data/
│   │   ├── servers.ts
│   │   ├── alerts.ts
│   │   ├── metrics.ts
│   │   └── services.ts
│   ├── hooks/
│   │   ├── useServers.ts
│   │   ├── useAlerts.ts
│   │   └── useSimulatedMetrics.ts
│   ├── services/
│   │   ├── serverService.ts
│   │   ├── alertService.ts
│   │   └── monitoringService.ts
│   ├── store/
│   │   └── appStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── calculations.ts
│   │   └── storage.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── README.md
├── package.json
└── ...
```

Do not create every file as an empty abstraction. Add files when they serve a real implementation need. A simpler structure is acceptable if it remains understandable.

### 6.4 Data flow

- Mock datasets are the initial source of server, alert, service, and historical metric data.
- Data service functions expose predictable asynchronous methods.
- React pages and hooks consume those methods.
- Shared state holds data that must remain consistent across routes.
- Dashboard KPIs are derived from shared state.
- Alert changes update shared state and LocalStorage.
- Metric simulation updates a shared metric source or a well-contained hook/store.
- UI components receive data through typed props.

Suggested service methods:

```typescript
getServers(): Promise<Server[]>
getServerById(id: string): Promise<Server | undefined>
getAlerts(): Promise<Alert[]>
resolveAlert(id: string): Promise<Alert>
getServices(): Promise<MonitoredService[]>
getMetrics(range: "1h" | "24h" | "7d"): Promise<Metric[]>
```

The methods may use a short artificial delay to demonstrate loading states, but avoid unnecessary complexity.

### 6.5 State management

Use React Context or Zustand. Choose one; do not introduce multiple global state libraries.

State should cover:

- Server dataset if it changes during simulation.
- Alert dataset and resolution actions.
- Selected metric range if shared.
- User preferences if implemented.

Local component state is appropriate for:

- Search input.
- Table filters.
- Open/closed dialogs.
- Selected tabs.
- Temporary form values.

Persist only state that should survive a refresh, particularly resolved alerts and preferences. Do not persist high-frequency metric history unless there is a clear reason.

---

## 7. UI/UX requirements

### 7.1 Visual direction

CloudPulse should resemble a professional cloud operations SaaS dashboard.

**Design characteristics**

- Clean, restrained, information-dense interface.
- Light theme as the default.
- Optional dark theme only if time permits.
- Indigo or blue as the primary brand color.
- Neutral gray/slate surfaces.
- Green for healthy/operational.
- Amber for warning/degraded.
- Red for critical/outage.
- Blue for informational events.

### 7.2 Typography and spacing

- Use Inter or a clean system sans-serif.
- Establish consistent heading sizes and weights.
- Use a spacing scale consistently.
- Avoid excessive shadows, gradients, and decorative effects.
- Keep table and chart labels readable.
- Maintain consistent border radius across cards and controls.

### 7.3 Layout details

**Sidebar**

- Product name and simple cloud icon.
- Navigation links with icons.
- Active navigation indicator.
- Optional demo environment label near the bottom.

**Header**

- Current page title.
- Simulated live status.
- Alert shortcut.
- Demo user/avatar.

**Main content**

- Page heading and concise description.
- KPI row on overview.
- Charts in a balanced grid.
- Tables for inventory and alerts.
- Status badges and resource utilization bars.
- Consistent empty/loading/error states.

### 7.4 Accessibility

- Use semantic HTML elements.
- Use buttons for actions and links for navigation.
- Provide labels for inputs.
- Ensure keyboard access to interactive controls.
- Do not rely on color alone for status.
- Provide visible focus states.
- Use sufficient text/background contrast.
- Give charts descriptive headings and summaries where practical.

### 7.5 Responsive behavior

Minimum expected behavior:

- Desktop: full sidebar and multi-column dashboard.
- Tablet: narrower navigation and reduced chart columns.
- Mobile: drawer/compact navigation, stacked cards and charts, usable tables.
- Avoid content being hidden behind fixed elements.
- Ensure dialogs and dropdowns fit within the viewport.

---

## 8. Technology and implementation constraints

Use the following stack unless the repository already contains a working equivalent:

| Area | Technology |
| --- | --- |
| Framework | React |
| Language | TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| UI primitives | shadcn/ui where useful |
| Charts | Recharts |
| Routing | React Router |
| Icons | Lucide React |
| Shared state | Zustand or React Context |
| Persistence | Browser LocalStorage |
| Deployment | Vercel |

### 8.1 Dependency discipline

- Inspect existing dependencies before installing packages.
- Do not install a package if native React or an existing dependency can solve the problem.
- Use a consistent package manager based on the repository lockfile.
- Avoid adding a backend, ORM, database, or cloud SDK.
- Do not spend time configuring tools that are not needed for the MVP.

### 8.2 Code quality

- Use functional React components.
- Use explicit TypeScript types.
- Avoid `any` unless there is a documented exceptional reason.
- Keep components focused and reusable.
- Avoid giant page components.
- Avoid duplicated business logic.
- Clean up intervals and event listeners.
- Avoid unnecessary abstractions.
- Ensure the project builds without TypeScript errors.

---

## 9. Non-functional requirements

### 9.1 Performance

- Initial screen should render promptly on a typical laptop.
- Avoid unnecessary re-renders and expensive calculations.
- Use a modest mock dataset.
- Avoid rendering hundreds or thousands of chart points.
- Do not add heavy libraries without justification.

### 9.2 Reliability

- No broken navigation links.
- No uncaught runtime errors during normal use.
- Invalid server IDs should show a not-found state.
- LocalStorage parsing must handle missing or invalid values safely.
- Simulated intervals must be cleaned up.
- Application should still work when optional preferences are absent.

### 9.3 Usability

- Important status information must be easy to scan.
- Users should understand what the metrics represent.
- Actions should provide visible feedback.
- Filters should be predictable and easy to reset.
- Empty states should explain what happened.

### 9.4 Compatibility

Target current versions of:

- Google Chrome.
- Microsoft Edge.
- Firefox.

Prioritize desktop Chrome for the capstone demonstration, while maintaining responsive behavior.

### 9.5 Security and privacy

- No real credentials or secrets in source code.
- No real infrastructure IPs or sensitive operational information.
- No claim of real monitoring.
- No authentication security claims.
- Avoid collecting personal information.

---

## 10. Testing and acceptance criteria

The application is considered submission-ready when all P0 criteria below pass.

### 10.1 Functional test checklist

| ID | Test | Expected result | Priority |
| --- | --- | --- | --- |
| T-01 | Open application root | Overview dashboard renders | P0 |
| T-02 | Navigate to Servers | Server inventory renders | P0 |
| T-03 | Search server by name | Matching servers appear | P0 |
| T-04 | Filter servers by status | Only matching statuses appear | P0 |
| T-05 | Open server details | Correct server details appear | P0 |
| T-06 | Open invalid server ID | Not-found state appears | P0 |
| T-07 | Open Monitoring | Charts render with units | P0 |
| T-08 | Change metric range | Chart data changes | P0 |
| T-09 | Open Alerts | Alert list renders | P0 |
| T-10 | Filter alerts | Matching alerts appear | P0 |
| T-11 | Resolve active alert | Alert status changes | P0 |
| T-12 | Refresh after resolving alert | Resolved state remains | P0 |
| T-13 | Check dashboard alert count | Count reflects active alerts | P0 |
| T-14 | Open Services | Service statuses render | P0 |
| T-15 | Resize to mobile width | Layout remains usable | P0 |
| T-16 | Inspect browser console | No application-breaking errors | P0 |
| T-17 | Build project | Production build succeeds | P0 |
| T-18 | Open deployed URL | Application loads publicly | P0 |
| T-19 | Toggle theme | Theme changes and persists | P1 |
| T-20 | Simulated metric refresh | Metrics update without reload | P1 |

### 10.2 Definition of done

A feature is done only when:

- Its UI is implemented.
- Its main interaction works.
- It uses typed data.
- It handles reasonable empty or invalid states.
- It does not break other routes.
- It has been manually tested.

A visually complete but non-interactive screen is not considered complete.

---

## 11. Delivery plan — one-day emergency schedule

**Deadline assumption:** Work begins on 5 November 2026 and submission is due 6 November 2026. The goal is a stable MVP, not feature completeness beyond the agreed scope.

### Phase 1 — Inspect and establish (first 30–45 minutes)

1. Inspect the repository and existing setup.
2. Identify the package manager and current dependencies.
3. Run the existing application.
4. Confirm React, TypeScript, and Vite are working.
5. Establish or repair the application shell.
6. Define shared types and mock datasets.

**Exit condition:** App runs locally and navigation shell exists.

### Phase 2 — Core screens (next 2–3 hours)

1. Implement overview dashboard.
2. Implement KPI calculations.
3. Add CPU and memory charts.
4. Implement server inventory.
5. Implement server detail route.
6. Implement monitoring range selection.

**Exit condition:** Dashboard, servers, and monitoring are usable.

### Phase 3 — Operational workflows (next 1–2 hours)

1. Implement alert table/list.
2. Add severity and status filters.
3. Implement resolve action.
4. Persist resolved alerts.
5. Implement services monitoring.
6. Add loading, empty, and error states where needed.

**Exit condition:** Core navigation and operational workflows work.

### Phase 4 — Polish and verify (next 1–2 hours)

1. Fix responsive layout.
2. Improve visual consistency.
3. Verify KPI calculations.
4. Test alert persistence.
5. Check browser console.
6. Run production build.
7. Fix all build errors.

**Exit condition:** Local production build succeeds and P0 tests pass.

### Phase 5 — Submission (final 45–60 minutes)

1. Deploy to Vercel.
2. Verify deployed routes and refresh behavior.
3. Write README.
4. Capture screenshots.
5. Prepare a short demo sequence.
6. Record known limitations honestly.

**Important:** Start deployment before the final hour if possible. Do not leave deployment, README, and testing until the last few minutes.

### If time becomes critically limited

Implement in this order:

1. Application shell and navigation.
2. Overview dashboard with derived KPI values.
3. Server inventory and details.
4. Alerts with working resolve action and persistence.
5. Monitoring charts.
6. Services page.
7. Responsive polish.
8. Optional settings and simulated live metrics.

A stable five-module application is better than six incomplete modules.

---

## 12. Submission deliverables

The final submission should contain:

1. **Source code:** Complete React + TypeScript project in a Git repository.
2. **Live deployment:** Public Vercel URL.
3. **README:** Project overview, features, technology stack, setup instructions, and limitations.
4. **Screenshots:** Overview, servers, monitoring, alerts, and services.
5. **SRS:** This requirements document.
6. **Testing evidence:** Completed functional checklist and any known limitations.
7. **Demonstration:** A concise walkthrough of the main workflows.

### README minimum contents

- Project title and tagline.
- Project description.
- Problem statement.
- Feature list.
- Technology stack.
- Screenshots.
- Local installation and run commands.
- Deployment URL.
- Mock/simulated data disclaimer.
- Known limitations and future enhancements.

---

## 13. Demonstration script

Use this order for a short capstone demonstration:

1. Introduce CloudPulse and explain the infrastructure visibility problem.
2. Open the overview and explain the KPI cards.
3. Show CPU and memory trends.
4. Open the server inventory and search for a server.
5. Open the server details page and explain its resource metrics.
6. Open Monitoring and change the time range.
7. Open Alerts, filter by severity, and resolve an alert.
8. Return to the overview and show the updated active-alert count.
9. Refresh the page and demonstrate that the resolved alert remains resolved.
10. Open Services and explain service health.
11. Briefly explain the frontend architecture, typed models, mock data service, and LocalStorage.
12. State clearly that the metrics are simulated and that real cloud integrations are future work.

### Suggested project pitch

> CloudPulse is a responsive cloud infrastructure monitoring dashboard designed to give technical teams a centralized view of server health, resource utilization, service availability, and operational alerts. The application demonstrates how infrastructure telemetry can be presented through an interactive interface, using React and TypeScript. For this capstone, infrastructure data is simulated to focus on frontend architecture, data visualization, state management, and user experience.

---

## 14. Future enhancements — not part of the deadline MVP

Potential future iterations:

- Integrate AWS CloudWatch, Azure Monitor, or Google Cloud Monitoring.
- Build a NestJS backend and persistent database.
- Add authentication and role-based access control.
- Ingest real metrics through APIs.
- Add WebSocket-based live updates.
- Integrate Prometheus and Grafana.
- Add configurable alert thresholds.
- Add notification channels.
- Add infrastructure grouping by environment or region.
- Add historical incident reports.

These enhancements must not delay the capstone submission.

---

## 15. Instructions to the coding agent

Treat this SRS as the source of truth for the implementation.

### 15.1 Required working approach

1. **Inspect before changing:** Inspect the current repository, package scripts, dependencies, and existing code before editing.
2. **Preserve working setup:** Do not replace configuration or scaffold a new application if a working React + TypeScript project already exists.
3. **Plan briefly:** Identify the smallest implementation sequence that satisfies P0 requirements.
4. **Build end-to-end:** Implement real navigation and working interactions, not static mockups alone.
5. **Use mock data:** Do not create backend infrastructure or connect real cloud providers.
6. **Use typed contracts:** Implement the interfaces in this document or compatible equivalents.
7. **Keep data consistent:** Derive KPIs and counts from shared data.
8. **Prioritize visual quality:** Use the specified professional dashboard aesthetic.
9. **Verify continuously:** Run the app and production build; fix errors before adding optional features.
10. **Deploy and document:** Provide the README and deployment-ready build.

### 15.2 Strict constraints

- The deadline is tomorrow. Optimize for delivery today.
- Do not over-engineer.
- Do not add unnecessary dependencies.
- Do not spend excessive time on animations or decorative effects.
- Do not implement real cloud integrations.
- Do not create non-functional buttons or navigation links.
- Do not leave placeholder pages for P0 modules.
- Do not claim simulated metrics are real.
- Do not stop after generating a plan; implement the application.
- Do not report tests as passed unless they were actually run.

### 15.3 Agent execution protocol

At the start:

- Inspect the repository.
- Report the existing stack and current state briefly.
- Identify any blockers.
- Begin implementation immediately.

During implementation:

- Work in small, coherent steps.
- Keep the application runnable.
- Prefer reusable components where they reduce duplication.
- Avoid unrelated refactoring.
- If a requirement is too expensive, preserve the core workflow and report the omission rather than silently pretending it is implemented.

Before completion:

- Run the available lint/type-check/build scripts.
- Fix all blocking errors.
- Manually verify the P0 acceptance criteria.
- Confirm the production build.
- Summarize implemented features, tests run, deployment status, and known limitations.

### 15.4 Final response expected from the coding agent

At completion, report:

- What was implemented.
- Routes available.
- Important interactions verified.
- Commands/tests executed and their actual outcomes.
- Build status.
- Deployment URL, if deployment succeeded.
- Any incomplete requirements.
- Any manual steps still required.

---

## 16. Final MVP acceptance statement

CloudPulse is ready for submission when a user can open the deployed application, navigate between the overview, server inventory, monitoring, alerts, and services pages, inspect simulated infrastructure data, filter servers and alerts, resolve an alert, see the dashboard update, refresh the page without losing the resolved state, and use the application on both desktop and mobile layouts.

The application must have a successful production build and must clearly disclose that its infrastructure data is simulated.

**Delivery principle: Ship a coherent, working monitoring experience. Do not sacrifice completion for unnecessary complexity.**
"""

out = "/mnt/data/CloudPulse_SRS.md"
pypandoc.convert_text(srs, "md", format="md", outputfile=out, extra_args=["--standalone"])
print(f"Created: {out}\nSize: {os.path.getsize(out):,} bytes")
