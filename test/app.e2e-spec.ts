import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";

describe('Test', () => {
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
  })
  it.todo('Passed')
})