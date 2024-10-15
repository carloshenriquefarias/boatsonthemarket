import { VStack, FormControl, FormLabel, Input, SimpleGrid, Textarea } from "@chakra-ui/react";

function NewsForm({ formData, handleInputChanges, handleTextAreaChanges, amountSections }: any) {
  return (
    <SimpleGrid columns={{ base: 1, md: 1, lg: 1, xl: 1 }} spacing={5}>
      <VStack mt={3}>
        <FormControl mt={2}>
          <FormLabel>Title news</FormLabel>
          <Input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChanges}
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Subtitle</FormLabel>
          <Input
            type={'text'}
            name='subtitle'
            value={formData.subtitle}
            onChange={handleInputChanges}
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Introduce</FormLabel>
          <Textarea
            placeholder="This is a short description about the news"
            size="lg"
            name='introduce'
            value={formData.introduce}
            onChange={handleTextAreaChanges}
            resize="vertical"
            height="12rem"
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Text divisor</FormLabel>
          <Textarea
            placeholder="Starting type here you have 500 characters"
            size="lg"
            name='textDivisor'
            value={formData.textDivisor}
            onChange={handleTextAreaChanges}
            resize="vertical"
            height="12rem"
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Text one</FormLabel>
          <Textarea
            placeholder="Starting type here you have 500 characters"
            size="lg"
            name='textOne'
            value={formData.textOne}
            onChange={handleTextAreaChanges}
            resize="vertical"
            height="12rem"
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel>Text two</FormLabel>
          <Textarea
            placeholder="Complement your text here"
            size="lg"
            name='textTwo'
            value={formData.textTwo}
            onChange={handleTextAreaChanges}
            resize="vertical"
            height="12rem"
          />
        </FormControl>

        {amountSections >= 2 && (
          <>
            <FormControl mt={2}>
              <FormLabel>Text three</FormLabel>
              <Textarea
                placeholder="Complement your text here"
                size="lg"
                name='textThree'
                value={formData.textThree}
                onChange={handleTextAreaChanges}
                resize="vertical"
                height="14rem"
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Text four</FormLabel>
              <Textarea
                placeholder="Complement your text here"
                size="lg"
                name='textFour'
                value={formData.textFour}
                onChange={handleTextAreaChanges}
                resize="vertical"
                height="14rem"
              />
            </FormControl>
          </>
        )}

        {amountSections >= 3 && (
          <>
            <FormControl mt={2}>
              <FormLabel>Text five</FormLabel>
              <Textarea
                placeholder="Complement your text here"
                size="lg"
                name='textFive'
                value={formData.textFive}
                onChange={handleTextAreaChanges}
                resize="vertical"
                height="14rem"
              />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel>Text six</FormLabel>
              <Textarea
                placeholder="Complement your text here"
                size="lg"
                name='textSix'
                value={formData.textSix}
                onChange={handleTextAreaChanges}
                resize="vertical"
                height="14rem"
              />
            </FormControl>
          </>
        )}

        <FormControl mt={2}>
          <FormLabel>Conclusion</FormLabel>
          <Textarea
            placeholder="End your text with a great thinking"
            size="lg"
            name='conclusion'
            value={formData.conclusion}
            onChange={handleTextAreaChanges}
            resize="vertical"
            height="12rem"
          />
        </FormControl>
      </VStack>
    </SimpleGrid>
  );
}

export default NewsForm;
