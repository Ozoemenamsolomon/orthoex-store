import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import CTA from '@components/CTA';
import { Container } from '@components/styled';
import { FormControl, FormSelect } from '@components/styled/Forms';
import { supabaseClient } from '@utils/supabase';
import { NextPage } from 'next';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const InputGroup: React.FC<
	{
		label: string;
		name: string;
		placeholder: string;
		type?: string;
		required?: false;
	} & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, name, type = 'text', required = true, ...props }) => {
	return (
		<FormControl>
			<label htmlFor={name}>{label}</label>
			<input type={type} id={name} name={name} required={required} {...props} />
		</FormControl>
	);
};

type Brand = { id: number; name: string; slug: string };
type Category = { id: number; name: string; slug: string };
type Custier = { name: string };

type Props = { brands: Brand[]; categories: Category[]; custiers: Custier[] };

const AddProduct: NextPage<Props> = ({ brands, categories, custiers }) => {
	const [productCode, setproductCode] = useState('fgj');
	// const [variants, setVariants] = useState([]);

	return (
		<Container>
			<h1
				style={{
					textAlign: 'center',
				}}>
				Add Product {productCode && ' variants'}
			</h1>
			{!productCode ? (
				<AddProductForm {...{ setproductCode, brands, categories }} />
			) : (
				<form action="/api/add-product-variants" method="post">
					<input type="hidden" name={productCode} />
					<fieldset
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fit,minmax(155px,1fr))',
							marginBottom: '2rem',
							gap: '.5rem',
						}}>
						<legend>Variant {'1'}</legend>
						<InputGroup
							label="Weight in gram"
							name="weightInGram"
							placeholder="weight in gram"
							type="number"
						/>
						<InputGroup
							label="hardness"
							name="hardness"
							placeholder="hardness"
							type="number"
						/>
						<InputGroup
							label="volume in mL"
							name="volumeInML"
							placeholder="volume in mL"
							type="number"
						/>
						<InputGroup
							label="colour"
							name="colour"
							placeholder="colour"
							type="number"
						/>
						<InputGroup
							label="gms"
							name="gms"
							placeholder="gms"
							type="number"
						/>
						<InputGroup
							label="material"
							name="material"
							placeholder="material"
							type="number"
						/>
						<InputGroup
							label="quantity in stock"
							name="quantity"
							placeholder="quantity in stock"
							type="number"
						/>
						<InputGroup
							label="price"
							name="price"
							placeholder="price"
							type="number"
						/>
					</fieldset>
					<CTA onClick={() => {}}>Add more variant</CTA>
				</form>
			)}
		</Container>
	);
};

export default AddProduct;

export const getServerSideProps = withPageAuthRequired({
	async getServerSideProps(ctx) {
		const session = await getSession(ctx.req, ctx.res);

		const custier = session?.user.custier;

		if (custier !== 'prime') {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			};
		}

		const [
			{ data: brands, error: brandsFetchError },
			{ data: categories, error: categoriesFetchError },
			{ data: custiers, error: custiersFetchError },
		] = await Promise.all([
			supabaseClient.from('brands').select('id,name,slug'),
			supabaseClient.from('categories').select('id,name,slug'),
			supabaseClient.from('custiers').select('name'),
		]);

		if (brandsFetchError || categoriesFetchError || custiersFetchError) {
			console.log({
				brandsFetchError,
				categoriesFetchError,
				custiersFetchError,
			});
		}

		return {
			props: {
				brands: brands || [],
				categories: categories || [],
				custiers: custiers || [],
			},
		};
	},
});

const AddProductForm: React.FC<{
	setproductCode: React.Dispatch<React.SetStateAction<string>>;
	brands: Brand[];
	categories: Category[];
}> = ({ brands, categories, setproductCode }) => {
	const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		const product = Object.fromEntries(formData.entries());

		const url = form.action;
		const method = form.method;

		const productCode = await fetch(url, {
			method,
			body: JSON.stringify(product),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then(res => {
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
		console.log({ productCode });
		setproductCode(productCode);
	};
	return (
		<form
			style={{
				maxWidth: '500px',
				marginInline: 'auto',
				marginBlock: '2rem',
			}}
			action="/api/add-product"
			onSubmit={addProduct}
			method="post">
			<InputGroup label="Product name" name="name" placeholder="Product name" />
			<FormSelect name="brand" id="brand" placeholder="Choose your brand">
				<option selected disabled value="default">
					Choose product brand
				</option>
				{brands.map(brand => (
					<option key={brand.id} value={brand.id}>
						{brand.name}
					</option>
				))}
			</FormSelect>
			<FormSelect
				name="category"
				id="category"
				placeholder="Choose your category">
				<option selected disabled value="default">
					Choose product category
				</option>
				{categories.map(category => (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				))}
			</FormSelect>
			<InputGroup label="Product code" name="code" placeholder="Product code" />
			<InputGroup
				label="Product image"
				name="image"
				placeholder="Product image"
			/>
			<InputGroup
				label="Product description"
				name="description"
				placeholder="Product description"
				type="textarea"
				required={false}
			/>
			<InputGroup
				label="Product details"
				name="details"
				placeholder="Product details"
				type="textarea"
				required={false}
			/>
			<CTA>Add Product Variants</CTA>
		</form>
	);
};

{
	/* <fieldset
style={{
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit,minmax(155px,1fr))',
	marginBottom: '2rem',
	gap: '.5rem',
}}>
<legend
	style={{
		padding: '.5rem',
		borderRadius: '.5rem',
		background: 'var(--oex-orange)',
		color: 'white',
	}}>
	Product prices (all in cents)
</legend>
<div style={{ gridColumn: ' 1/-1' }}>
	<InputGroup
		label="default"
		name="defaultPrice"
		placeholder="Product default price"
		type="number"
	/>
</div>
{custiers.map(custier => (
	<InputGroup
		key={custier.name}
		label={custier.name}
		name={custier.name}
		placeholder={custier.name}
		type="number"
		required={false}
	/>
))}
</fieldset> */
}
