import {
  LayoutDashboard,
  ChartLine,
  KeyRound,
  UserCog,
  Cctv,
  Handshake,
  IdCard,
  NotebookText,
  Music4,
  Castle,
  Crosshair,
  Rocket,
  MessageSquareQuote,
  Database,
  Settings2,
  Settings,
  LaptopMinimalCheck,
  SquareUserRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Icon {
  [key: string]: LucideIcon;
}
export const iconComponentMap: Icon = {
  LayoutDashboard: LayoutDashboard,
  ChartLine: ChartLine,
  // KeyRound: KeyRound,
  UserCog: UserCog,
  Cctv: Cctv,
  Handshake: Handshake,
  IdCard: IdCard,
  NotebookText: NotebookText,
  Music4: Music4,
  Castle: Castle,
  Crosshair: Crosshair,
  Rocket: Rocket,
  MessageSquareQuote: MessageSquareQuote,
  Database: Database,
  Settings2: Settings2,
  Settings: Settings,
  LaptopMinimalCheck: LaptopMinimalCheck,
  SquareUserRound: SquareUserRound,
};
