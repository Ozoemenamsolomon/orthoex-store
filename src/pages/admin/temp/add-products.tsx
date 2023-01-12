import CTA from '@components/CTA';
import { Container } from '@components/styled';
import { FormControl } from '@components/styled/Forms';
import { toast } from 'react-toastify';

type Props = {};

const InputGroup: React.FC<
	{
		label: string;
		name: string;
		placeholder: string;
		type?: string;
		required?: false;
	} & React.HTMLAttributes<HTMLInputElement>
> = ({
	label,
	name,
	type = 'text',
	placeholder,
	required = true,
	...props
}) => {
	return (
		<FormControl>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				required={required}
				placeholder={placeholder}
				{...props}
			/>
		</FormControl>
	);
};

const AddProduct = (props: Props) => {
	const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData.entries());
		const url = form.action;
		const method = form.method;

		fetch(url, {
			method,
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
			console.log(res);
			if (!res.ok) {
				return res.json().then(err => {
					toast.error(err.error);
					return err;
				});
			}
			toast.success('Product added successfully');
			form.reset();
			return res.json();
		});
	};
	return (
		<Container>
			<h1
				style={{
					textAlign: 'center',
				}}>
				AddProduct
			</h1>
			<form
				style={{
					maxWidth: '500px',
					marginInline: 'auto',
					marginBlock: '2rem',
				}}
				action="/api/add-product"
				onSubmit={addProduct}
				method="post">
				<InputGroup
					label="Product name"
					name="productName"
					placeholder="Product name"
				/>
				<InputGroup
					label="Product code"
					name="productCode"
					placeholder="Product code"
				/>
				<InputGroup
					label="Product image"
					name="productImage"
					placeholder="Product image"
				/>
				<InputGroup
					label="Product price"
					name="productPrice"
					placeholder="Product price"
					type="number"
				/>
				<InputGroup
					label="Product description"
					name="productDescription"
					placeholder="Product description"
					type="textarea"
				/>
				<CTA>Add Product</CTA>
			</form>
		</Container>
	);
};

export default AddProduct;
