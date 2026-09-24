import { Tab, Tabs } from "./Tabs";

export default function TabsPage() {
  return (
    <>
      <Tabs defaultTab="dashboard">
        <Tab name="profile">
          <p>PROFILE DETAILS</p>
        </Tab>
        <Tab name="dashboard">
          <p>DASHBOARD DETAILS</p>
        </Tab>
        <Tab name="settings">
          <p>SETTINGS DETAILS</p>
        </Tab>
      </Tabs>
    </>
  );
}
