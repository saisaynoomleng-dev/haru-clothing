import { Box, Button, Code, Flex } from '@sanity/ui';
import { set, StringInputProps } from 'sanity';
import { useCallback } from 'react';
import { skuGenerator } from '@/lib/formatter';

export function SkuInput(props: StringInputProps) {
  const { onChange } = props;

  const generateSKU = useCallback(() => {
    const sku = skuGenerator();
    onChange(set(sku));
  }, [onChange]);

  return (
    <Flex gap={3} align={'center'}>
      <Box flex={1}>{props.renderDefault(props)}</Box>
      <Button mode="ghost" onClick={generateSKU} text="Generate SKU" />
    </Flex>
  );
}
