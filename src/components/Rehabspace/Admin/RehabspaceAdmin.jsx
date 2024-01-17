import React, { useEffect, useState } from 'react';
import ColumnA from './ColumnA';
import ColumnB from './ColumnB';
import ColumnC from './ColumnC';
import { fetchAll } from '@utils/rehabspcetable';
import { toast } from 'react-toastify';

const RehabspaceAdmin = ({rehabspaceData}) => {
	const [toggle, setToggle] = useState(null);
	
	return (
		<main className="mx-auto  max-w-[1500px] max-md:px-[1rem] px-[4rem] py-12 ">
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="md:grid hidden">
					<ColumnA setToggle={setToggle} toggle={toggle} />
				</div>
				<div className="md:hidden">
					{!toggle?.id ? (
						<ColumnA setToggle={setToggle} toggle={toggle} />
					) : (
						<div className="md:hidden">
							<ColumnB type={'a'} toggle={toggle} setToggle={setToggle} />
						</div>
					)}
				</div>

				<div className="md:grid hidden">
					<ColumnB toggle={toggle} setToggle={setToggle} />
				</div>

				<ColumnC />
			</div>
		</main>
	);
};

export default RehabspaceAdmin;
