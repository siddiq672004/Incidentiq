type Props = {

title: string;

value: string;

};

export default function StatCard({

title,

value,

}: Props) {

return (

<div className="rounded-lg border p-6 shadow-sm">

<h2 className="text-gray-500">

{title}

</h2>

<p className="mt-2 text-4xl font-bold">

{value}

</p>

</div>

);

}