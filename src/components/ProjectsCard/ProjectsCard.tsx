import { Box, Button, Card, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { motion } from 'framer-motion';
import useTranslation from 'next-translate/useTranslation';
import { ArrowRight } from 'tabler-icons-react';

const ProjectsCard = ({ title, description, href }) => {
  const { t } = useTranslation();
  const { hovered, ref } = useHover();

  return (
    <Card shadow='sm' radius='lg' p={32}>
      <Title order={2} m={0}>
        {title}
      </Title>
      <p>{description}</p>
      <Box sx={{ display: 'inline-block' }} ref={ref}>
        <Button
          component='a'
          target='_blank'
          rel='noopener noreferrer'
          href={href}
          rightIcon={
            <motion.div animate={{ x: hovered ? 5 : 0 }}>
              <ArrowRight size={20} />
            </motion.div>
          }
          sx={{
            '&:hover': {
              textDecoration: 'none',
            },
          }}
        >
          {t('common:visit')}
        </Button>
      </Box>
    </Card>
  );
};

export default ProjectsCard;
