import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Breadcrumbs from "../component/common/Breadcrumbs";
import { brands, categories, colors, sizes } from "../data/products";

function toSlug(value) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

function nextSku(name) {
	const prefix = (name || "PRD")
		.replace(/[^a-zA-Z]/g, "")
		.toUpperCase()
		.slice(0, 3)
		.padEnd(3, "X");

	return `${prefix}-${Date.now().toString().slice(-6)}`;
}

export default function CreateProductPage() {
	const [createdProducts, setCreatedProducts] = useState([]);
	const [submittedProduct, setSubmittedProduct] = useState(null);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
			sku: "",
			category: categories[0],
			brand: brands[0],
			price: 49,
			compareAt: 69,
			stock: 10,
			rating: 4.5,
			reviewCount: 0,
			description: "",
			image1: "",
			image2: "",
			isNew: true,
			isPopular: false,
			colors: [colors[0]],
			sizes: [sizes[1]],
			specs: "",
		},
	});

	const formValues = watch();

	const livePreview = useMemo(() => {
		const name = formValues.name?.trim() || "Untitled Product";
		const image = formValues.image1?.trim() || "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80";

		return {
			id: Date.now(),
			slug: toSlug(name),
			name,
			sku: formValues.sku?.trim() || nextSku(name),
			category: formValues.category,
			brand: formValues.brand,
			price: Number(formValues.price || 0),
			compareAt: Number(formValues.compareAt || 0),
			rating: Number(formValues.rating || 0),
			reviewCount: Number(formValues.reviewCount || 0),
			stock: Number(formValues.stock || 0),
			isNew: !!formValues.isNew,
			isPopular: !!formValues.isPopular,
			colors: formValues.colors?.length ? formValues.colors : [colors[0]],
			sizes: formValues.sizes?.length ? formValues.sizes : [sizes[0]],
			images: [
				image,
				formValues.image2?.trim() || image,
			],
			description: formValues.description?.trim() || "No description yet.",
			specs: formValues.specs
				? formValues.specs.split("\n").map((item) => item.trim()).filter(Boolean)
				: ["No specifications added."],
		};
	}, [formValues]);

	function onSubmit(values) {
		const product = {
			id: Date.now(),
			slug: toSlug(values.name),
			name: values.name.trim(),
			sku: values.sku?.trim() || nextSku(values.name),
			category: values.category,
			brand: values.brand,
			price: Number(values.price),
			compareAt: Number(values.compareAt),
			rating: Number(values.rating),
			reviewCount: Number(values.reviewCount),
			stock: Number(values.stock),
			isNew: !!values.isNew,
			isPopular: !!values.isPopular,
			colors: values.colors,
			sizes: values.sizes,
			images: [
				values.image1.trim(),
				values.image2?.trim() || values.image1.trim(),
			],
			description: values.description.trim(),
			specs: values.specs.split("\n").map((item) => item.trim()).filter(Boolean),
		};

		setCreatedProducts((prev) => [product, ...prev]);
		setSubmittedProduct(product);
		reset({
			...values,
			name: "",
			sku: "",
			description: "",
			image1: "",
			image2: "",
			specs: "",
			reviewCount: 0,
			isPopular: false,
		});
	}

	return (
		<div>
			<Breadcrumbs />

			<div className="mb-6 rounded-2xl border border-black/10 bg-white p-5">
				<h1 className="text-3xl font-bold">Create Product</h1>
				<p className="mt-2 text-sm text-neutral-600">
					Build a product payload quickly and preview it before connecting to an API.
				</p>
			</div>

			<div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
				<section className="rounded-2xl border border-black/10 bg-white p-5">
					<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
						<div className="grid gap-4 md:grid-cols-2">
							<label className="text-sm">
								<span className="mb-1 block font-medium">Product Name</span>
								<input
									className="w-full rounded-lg border border-neutral-300 px-3 py-2"
									placeholder="Minimal Leather Bag"
									{...register("name", { required: "Product name is required" })}
								/>
								{errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name.message}</p>}
							</label>

							<label className="text-sm">
								<span className="mb-1 block font-medium">SKU (optional)</span>
								<input
									className="w-full rounded-lg border border-neutral-300 px-3 py-2"
									placeholder="SH-ML-002"
									{...register("sku")}
								/>
							</label>

							<label className="text-sm">
								<span className="mb-1 block font-medium">Category</span>
								<select className="w-full rounded-lg border border-neutral-300 px-3 py-2" {...register("category")}>
									{categories.map((item) => (
										<option key={item} value={item}>{item}</option>
									))}
								</select>
							</label>

							<label className="text-sm">
								<span className="mb-1 block font-medium">Brand</span>
								<select className="w-full rounded-lg border border-neutral-300 px-3 py-2" {...register("brand")}>
									{brands.map((item) => (
										<option key={item} value={item}>{item}</option>
									))}
								</select>
							</label>

							<label className="text-sm">
								<span className="mb-1 block font-medium">Price</span>
								<input
									type="number"
									min="1"
									className="w-full rounded-lg border border-neutral-300 px-3 py-2"
									{...register("price", {
										required: "Price is required",
										min: { value: 1, message: "Price must be at least 1" },
										valueAsNumber: true,
									})}
								/>
								{errors.price && <p className="mt-1 text-xs text-rose-600">{errors.price.message}</p>}
							</label>

							<label className="text-sm">
								<span className="mb-1 block font-medium">Compare At</span>
								<input
									type="number"
									min="1"
									className="w-full rounded-lg border border-neutral-300 px-3 py-2"
									{...register("compareAt", {
										required: "Compare at price is required",
										min: { value: 1, message: "Compare at must be at least 1" },
										valueAsNumber: true,
									})}
								/>
								{errors.compareAt && <p className="mt-1 text-xs text-rose-600">{errors.compareAt.message}</p>}
							</label>

							<label className="text-sm">
								<span className="mb-1 block font-medium">Stock</span>
								<input
									type="number"
									min="0"
									className="w-full rounded-lg border border-neutral-300 px-3 py-2"
									{...register("stock", {
										required: "Stock is required",
										min: { value: 0, message: "Stock cannot be negative" },
										valueAsNumber: true,
									})}
								/>
								{errors.stock && <p className="mt-1 text-xs text-rose-600">{errors.stock.message}</p>}
							</label>

							<label className="text-sm">
								<span className="mb-1 block font-medium">Rating</span>
								<input
									type="number"
									min="0"
									max="5"
									step="0.1"
									className="w-full rounded-lg border border-neutral-300 px-3 py-2"
									{...register("rating", {
										required: "Rating is required",
										min: { value: 0, message: "Minimum rating is 0" },
										max: { value: 5, message: "Maximum rating is 5" },
										valueAsNumber: true,
									})}
								/>
								{errors.rating && <p className="mt-1 text-xs text-rose-600">{errors.rating.message}</p>}
							</label>

							<label className="text-sm">
								<span className="mb-1 block font-medium">Review Count</span>
								<input
									type="number"
									min="0"
									className="w-full rounded-lg border border-neutral-300 px-3 py-2"
									{...register("reviewCount", {
										required: "Review count is required",
										min: { value: 0, message: "Review count cannot be negative" },
										valueAsNumber: true,
									})}
								/>
								{errors.reviewCount && <p className="mt-1 text-xs text-rose-600">{errors.reviewCount.message}</p>}
							</label>
						</div>

						<div className="grid gap-4 md:grid-cols-2">
							<label className="text-sm">
								<span className="mb-1 block font-medium">Image URL 1</span>
								<input
									className="w-full rounded-lg border border-neutral-300 px-3 py-2"
									placeholder="https://..."
									{...register("image1", { required: "Primary image is required" })}
								/>
								{errors.image1 && <p className="mt-1 text-xs text-rose-600">{errors.image1.message}</p>}
							</label>

							<label className="text-sm">
								<span className="mb-1 block font-medium">Image URL 2</span>
								<input className="w-full rounded-lg border border-neutral-300 px-3 py-2" placeholder="https://..." {...register("image2")} />
							</label>
						</div>

						<label className="block text-sm">
							<span className="mb-1 block font-medium">Description</span>
							<textarea
								rows={4}
								className="w-full rounded-lg border border-neutral-300 px-3 py-2"
								placeholder="Soft-grain everyday bag with magnetic closure and inner zipper pocket."
								{...register("description", {
									required: "Description is required",
									minLength: { value: 10, message: "Description should be at least 10 characters" },
								})}
							/>
							{errors.description && <p className="mt-1 text-xs text-rose-600">{errors.description.message}</p>}
						</label>

						<label className="block text-sm">
							<span className="mb-1 block font-medium">Specifications (one per line)</span>
							<textarea
								rows={4}
								className="w-full rounded-lg border border-neutral-300 px-3 py-2"
								placeholder={"Genuine leather\nAdjustable strap\nWidth 30cm"}
								{...register("specs", {
									required: "Add at least one specification",
									validate: (value) =>
										value.split("\n").map((item) => item.trim()).filter(Boolean).length > 0 || "Add at least one specification",
								})}
							/>
							{errors.specs && <p className="mt-1 text-xs text-rose-600">{errors.specs.message}</p>}
						</label>

						<div className="grid gap-4 md:grid-cols-2">
							<fieldset className="rounded-xl border border-neutral-200 p-3 text-sm">
								<legend className="px-1 text-sm font-medium">Colors</legend>
								<div className="mt-2 flex flex-wrap gap-2">
									{colors.map((item) => {
										const selected = formValues.colors?.includes(item);
										return (
											<button
												key={item}
												type="button"
												onClick={() => {
													const current = formValues.colors || [];
													const next = selected ? current.filter((entry) => entry !== item) : [...current, item];
													setValue("colors", next.length ? next : [item], { shouldValidate: true });
												}}
												className={`rounded-full border px-3 py-1.5 ${selected ? "border-black bg-black text-white" : "border-neutral-300"}`}
											>
												{item}
											</button>
										);
									})}
								</div>
							</fieldset>

							<fieldset className="rounded-xl border border-neutral-200 p-3 text-sm">
								<legend className="px-1 text-sm font-medium">Sizes</legend>
								<div className="mt-2 flex flex-wrap gap-2">
									{sizes.map((item) => {
										const selected = formValues.sizes?.includes(item);
										return (
											<button
												key={item}
												type="button"
												onClick={() => {
													const current = formValues.sizes || [];
													const next = selected ? current.filter((entry) => entry !== item) : [...current, item];
													setValue("sizes", next.length ? next : [item], { shouldValidate: true });
												}}
												className={`rounded-full border px-3 py-1.5 ${selected ? "border-black bg-black text-white" : "border-neutral-300"}`}
											>
												{item}
											</button>
										);
									})}
								</div>
							</fieldset>
						</div>

						<div className="flex flex-wrap items-center gap-3 text-sm">
							<label className="inline-flex items-center gap-2">
								<input type="checkbox" {...register("isNew")} />
								New arrival
							</label>
							<label className="inline-flex items-center gap-2">
								<input type="checkbox" {...register("isPopular")} />
								Popular product
							</label>
						</div>

						<div className="flex flex-wrap gap-3 pt-2">
							<button type="submit" className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white">Create Product</button>
							<button
								type="button"
								className="rounded-xl border border-neutral-300 px-4 py-2 text-sm"
								onClick={() => reset()}
							>
								Reset Form
							</button>
						</div>
					</form>
				</section>

				<section className="space-y-4">
					<article className="rounded-2xl border border-black/10 bg-white p-4">
						<p className="text-sm font-semibold text-neutral-600">Live Preview</p>
						<img src={livePreview.images[0]} alt={livePreview.name} className="mt-3 h-56 w-full rounded-xl object-cover" />
						<p className="mt-3 text-xs text-neutral-500">{livePreview.brand} • {livePreview.category}</p>
						<h2 className="mt-1 text-xl font-bold">{livePreview.name}</h2>
						<p className="mt-1 text-sm text-neutral-600">SKU: {livePreview.sku}</p>
						<div className="mt-2 flex items-center gap-3">
							<p className="text-lg font-bold">${livePreview.price}</p>
							<p className="text-sm text-neutral-500 line-through">${livePreview.compareAt}</p>
						</div>
						<p className="mt-2 text-sm text-neutral-700">{livePreview.description}</p>
						<div className="mt-3 flex flex-wrap gap-2 text-xs">
							{livePreview.colors.map((item) => <span key={item} className="rounded-full border px-2 py-1">{item}</span>)}
						</div>
						<div className="mt-2 flex flex-wrap gap-2 text-xs">
							{livePreview.sizes.map((item) => <span key={item} className="rounded-full border px-2 py-1">{item}</span>)}
						</div>
					</article>

					<article className="rounded-2xl border border-black/10 bg-white p-4">
						<div className="mb-3 flex items-center justify-between">
							<h3 className="text-lg font-semibold">Created Products</h3>
							<span className="rounded-full bg-neutral-100 px-2 py-1 text-xs">{createdProducts.length}</span>
						</div>

						{!createdProducts.length ? (
							<p className="text-sm text-neutral-600">No products created yet.</p>
						) : (
							<ul className="space-y-2">
								{createdProducts.map((item) => (
									<li key={item.id} className="rounded-xl border border-neutral-200 px-3 py-2 text-sm">
										<p className="font-medium">{item.name}</p>
										<p className="text-xs text-neutral-600">{item.sku} • {item.category} • ${item.price}</p>
									</li>
								))}
							</ul>
						)}

						{submittedProduct && (
							<div className="mt-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
								Created: {submittedProduct.name}
							</div>
						)}
					</article>
				</section>
			</div>
		</div>
	);
}
