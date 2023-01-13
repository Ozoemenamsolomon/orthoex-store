import CTA from '@components/CTA';
import { Container } from '@components/styled';
import { FormControl, FormSelect } from '@components/styled/Forms';
import { supabaseClient } from '@utils/supabase';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
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

type Props = { brands: Brand[]; categories: Category[] };

const AddProduct: NextPage<Props> = ({ brands, categories }) => {
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
					name="name"
					placeholder="Product name"
				/>
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
				<InputGroup
					label="Product code"
					name="code"
					placeholder="Product code"
				/>
				<InputGroup
					label="Product image"
					name="image"
					placeholder="Product image"
				/>
				<InputGroup
					label="Product price"
					name="price"
					placeholder="Product price"
					type="number"
					step={0.01}
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
				<CTA>Add Product</CTA>
			</form>
		</Container>
	);
};

export default AddProduct;

export const getServerSideProps: GetServerSideProps = async ctx => {
	if (ctx.req.cookies['temp_admin_cookie'] !== process.env.ADMIN_COOKIE_VALUE) {
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
	] = await Promise.all([
		supabaseClient.from('brands').select('id,name,slug'),
		supabaseClient.from('categories').select('id,name,slug'),
	]);

	if (brandsFetchError || categoriesFetchError) {
		console.log({
			brandsFetchError,
			categoriesFetchError,
		});
	}

	return {
		props: { brands: brands || [], categories: categories || [] },
	};
};
