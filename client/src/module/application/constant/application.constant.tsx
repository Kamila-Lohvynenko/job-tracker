import * as m from "@/paraglide/messages";
import { EApplicationEventType } from "@/shared/rest-api/interface/application-events";
import {
  Award,
  BadgeCheck,
  ClipboardList,
  Code2,
  LogOut,
  MessageCircle,
  Network,
  RefreshCw,
  Send,
  Shapes,
  StickyNote,
  Terminal,
  Users,
  XCircle,
  type LucideIcon,
} from "lucide-react";

// application tabs
export const APPLICATION_TABS = [
  {
    id: "overview",
    label: m.application_tab_overview,
  },
  {
    id: "timeline",
    label: m.application_tab_timeline,
  },
];

// application event config
type ApplicationEventConfig = {
  Icon: LucideIcon;
  color: string;
  textColor: string;
  backgroundColor: string;
};

export const APPLICATION_EVENT_CONFIG = {
  [EApplicationEventType.APPLICATION_SUBMITTED]: {
    Icon: Send,
    color: "var(--application-event-submitted)",
    textColor: "var(--application-event-submitted-text)",
    backgroundColor: "var(--application-event-submitted-bg)",
  },
  [EApplicationEventType.HR_INTERVIEW]: {
    Icon: Users,
    color: "var(--application-event-hr-interview)",
    textColor: "var(--application-event-hr-interview-text)",
    backgroundColor: "var(--application-event-hr-interview-bg)",
  },
  [EApplicationEventType.INTERVIEW]: {
    Icon: MessageCircle,
    color: "var(--application-event-interview)",
    textColor: "var(--application-event-interview-text)",
    backgroundColor: "var(--application-event-interview-bg)",
  },
  [EApplicationEventType.TECHNICAL_INTERVIEW]: {
    Icon: Code2,
    color: "var(--application-event-technical-interview)",
    textColor: "var(--application-event-technical-interview-text)",
    backgroundColor: "var(--application-event-technical-interview-bg)",
  },
  [EApplicationEventType.LIVE_CODING]: {
    Icon: Terminal,
    color: "var(--application-event-live-coding)",
    textColor: "var(--application-event-live-coding-text)",
    backgroundColor: "var(--application-event-live-coding-bg)",
  },
  [EApplicationEventType.SYSTEM_DESIGN]: {
    Icon: Network,
    color: "var(--application-event-system-design)",
    textColor: "var(--application-event-system-design-text)",
    backgroundColor: "var(--application-event-system-design-bg)",
  },
  [EApplicationEventType.TAKE_HOME_TASK]: {
    Icon: ClipboardList,
    color: "var(--application-event-take-home-task)",
    textColor: "var(--application-event-take-home-task-text)",
    backgroundColor: "var(--application-event-take-home-task-bg)",
  },
  [EApplicationEventType.FINAL_INTERVIEW]: {
    Icon: Award,
    color: "var(--application-event-final-interview)",
    textColor: "var(--application-event-final-interview-text)",
    backgroundColor: "var(--application-event-final-interview-bg)",
  },
  [EApplicationEventType.OFFER]: {
    Icon: BadgeCheck,
    color: "var(--application-event-offer)",
    textColor: "var(--application-event-offer-text)",
    backgroundColor: "var(--application-event-offer-bg)",
  },
  [EApplicationEventType.REJECTION]: {
    Icon: XCircle,
    color: "var(--application-event-rejection)",
    textColor: "var(--application-event-rejection-text)",
    backgroundColor: "var(--application-event-rejection-bg)",
  },
  [EApplicationEventType.WITHDRAWN]: {
    Icon: LogOut,
    color: "var(--application-event-withdrawn)",
    textColor: "var(--application-event-withdrawn-text)",
    backgroundColor: "var(--application-event-withdrawn-bg)",
  },
  [EApplicationEventType.FOLLOW_UP]: {
    Icon: RefreshCw,
    color: "var(--application-event-follow-up)",
    textColor: "var(--application-event-follow-up-text)",
    backgroundColor: "var(--application-event-follow-up-bg)",
  },
  [EApplicationEventType.NOTE]: {
    Icon: StickyNote,
    color: "var(--application-event-note)",
    textColor: "var(--application-event-note-text)",
    backgroundColor: "var(--application-event-note-bg)",
  },
  [EApplicationEventType.CUSTOM]: {
    Icon: Shapes,
    color: "var(--application-event-custom)",
    textColor: "var(--application-event-custom-text)",
    backgroundColor: "var(--application-event-custom-bg)",
  },
} satisfies Record<EApplicationEventType, ApplicationEventConfig>;
