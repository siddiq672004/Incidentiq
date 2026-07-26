import StatCard from "@/app/components/StatCard";

export default function Dashboard() {

return (

<main className="grid grid-cols-4 gap-6 p-8">

<StatCard

title="Today's Incidents"

value="12"

/>

<StatCard

title="Critical"

value="2"

/>

<StatCard

title="Resolved"

value="9"

/>

<StatCard

title="Pending"

value="3"

/>

</main>

);

}