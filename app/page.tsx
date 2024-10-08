import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared/productsGroupList";
import { prisma } from "@/prisma/prismaClient";

export default async function Home() {
  return <>
    <Container className="mt-10">
      <Title text="Все категории" size="lg" className="font-extrabold" />
    </Container>
    <TopBar />

    <Container className="pb-14 mt-10">
      <div className="flex gap-[60px]">
        {/*Фильтрация*/}
        <div className="w-[250]px">
          <Filters />
        </div>

        {/*Список товаров*/}

        <div className="flex-1">
          <div className="flex flex-col gap-16">
            <ProductsGroupList
              title="Акции и скидки"
              items={[
                {
                  id: 1,
                  name: 'Beauty Act',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/of3627dfb07ad316614d43dd81144943e_8072978_180928_0694_e8453bc2-5d60-4058-ac8c-7420c695782d.jpg?v=1635068974&width=600'
                },
                {
                  id: 2,
                  name: 'Beauty Act',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/of3627dfb07ad316614d43dd81144943e_8072978_180928_0694_e8453bc2-5d60-4058-ac8c-7420c695782d.jpg?v=1635068974&width=600'
                },
                {
                  id: 3,
                  name: 'Beauty Act',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/of3627dfb07ad316614d43dd81144943e_8072978_180928_0694_e8453bc2-5d60-4058-ac8c-7420c695782d.jpg?v=1635068974&width=600'
                },
                {
                  id: 4,
                  name: 'Beauty Act',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/of3627dfb07ad316614d43dd81144943e_8072978_180928_0694_e8453bc2-5d60-4058-ac8c-7420c695782d.jpg?v=1635068974&width=600'
                },
                {
                  id: 5,
                  name: 'Beauty Act',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/of3627dfb07ad316614d43dd81144943e_8072978_180928_0694_e8453bc2-5d60-4058-ac8c-7420c695782d.jpg?v=1635068974&width=600'
                },
                {
                  id: 6,
                  name: 'Beauty Act',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/of3627dfb07ad316614d43dd81144943e_8072978_180928_0694_e8453bc2-5d60-4058-ac8c-7420c695782d.jpg?v=1635068974&width=600'
                },
                {
                  id: 7,
                  name: 'Beauty Act',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/of3627dfb07ad316614d43dd81144943e_8072978_180928_0694_e8453bc2-5d60-4058-ac8c-7420c695782d.jpg?v=1635068974&width=600'
                },
                {
                  id: 8,
                  name: 'Beauty Act',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/of3627dfb07ad316614d43dd81144943e_8072978_180928_0694_e8453bc2-5d60-4058-ac8c-7420c695782d.jpg?v=1635068974&width=600'
                },

              ]}
              categoryId={1} />

            <ProductsGroupList
              title="Уход и красота"
              items={[
                {
                  id: 1,
                  name: 'La-Seine',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/Pracollaron_44aa5315-24d4-4622-8576-668db92ef47b.jpg?v=1635069023&width=400'
                },
                {
                  id: 2,
                  name: 'La-Seine',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/Pracollaron_44aa5315-24d4-4622-8576-668db92ef47b.jpg?v=1635069023&width=400'
                },
                {
                  id: 3,
                  name: 'La-Seine',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/Pracollaron_44aa5315-24d4-4622-8576-668db92ef47b.jpg?v=1635069023&width=400'
                },
                {
                  id: 4,
                  name: 'La-Seine',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/Pracollaron_44aa5315-24d4-4622-8576-668db92ef47b.jpg?v=1635069023&width=400'
                },
                {
                  id: 5,
                  name: 'La-Seine',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/Pracollaron_44aa5315-24d4-4622-8576-668db92ef47b.jpg?v=1635069023&width=400'
                },
                {
                  id: 6,
                  name: 'La-Seine',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/Pracollaron_44aa5315-24d4-4622-8576-668db92ef47b.jpg?v=1635069023&width=400'
                },
                {
                  id: 7,
                  name: 'La-Seine',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/Pracollaron_44aa5315-24d4-4622-8576-668db92ef47b.jpg?v=1635069023&width=400'
                },
                {
                  id: 8,
                  name: 'La-Seine',
                  price: 550,
                  items: [{ price: 550 }],
                  imageUrl: 'https://tsujimotomarket.com/cdn/shop/products/Pracollaron_44aa5315-24d4-4622-8576-668db92ef47b.jpg?v=1635069023&width=400'
                },

              ]}
              categoryId={2} />

          </div>


        </div>
      </div>

    </Container>
  </>
}
