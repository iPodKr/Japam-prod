import { Container, Filters, Title, TopBar } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/productsGroupList";
import { Suspense } from "react";
import { findProducts, GetSearchParams } from "@/shared/lib/findProducts";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {

  const categories = await findProducts(searchParams)

  return <>
    <Container className="mt-10">
      <Title text="Все категории" size="lg" className="font-extrabold" />
    </Container>
    <TopBar categories={categories.filter((category) => category.product.length > 0)} />
    <Container className="pb-14 mt-10">
      <div className="flex flex-col lg:flex-row gap-[30px] lg:gap-[60px]">
        {/* Фильтрация */}
        <div className="w-full lg:w-[250px]">
          <Suspense>
            <Filters />
          </Suspense>
        </div>

        {/* Список товаров */}
        <div className="flex-1">
          <div className="flex flex-col gap-8 lg:gap-16">
            {categories.map((category) => (
              (category.product.length > 0) &&
              <ProductsGroupList
                key={category.id}
                title={category.name}
                categoryId={category.id}
                items={category.product}
                listClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-[50px]"
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  </>
}
