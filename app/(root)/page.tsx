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
      <div className="flex gap-[60px]">
        {/*Фильтрация*/}
        <div className="w-[250]px">
          <Suspense>
            <Filters />
          </Suspense>
        </div>

        {/*Список товаров*/}

        <div className="flex-1">
          <div className="flex flex-col gap-16">
            {
              categories.map((category) => (
                (category.product.length > 0) &&
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  categoryId={category.id}
                  items={category.product}
                />
              ))
            }
          </div>
        </div>
      </div>

    </Container>
  </>
}
