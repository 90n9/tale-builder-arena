import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { GET as getGameSetup } from './route';

const setupUrl = 'http://localhost/api/game/crypt_of_the_shattered_star/setup';

describe('GET /api/game/[slug]/setup', () => {
  it('returns 404 when the game is missing', async () => {
    const request = new NextRequest(`${setupUrl}?race=human`);

    const response = await getGameSetup(request, {
      params: Promise.resolve({ slug: 'unknown-game' }),
    });

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body).toEqual({ error: 'Game not found' });
  });

  it('combines base attributes with race and class bonuses', async () => {
    const request = new NextRequest(`${setupUrl}?race=human&class=warrior`);

    const response = await getGameSetup(request, {
      params: Promise.resolve({ slug: 'crypt_of_the_shattered_star' }),
    });

    expect(response.status).toBe(200);
    const body = await response.json();

    expect(body.gameId).toBe('crypt_of_the_shattered_star');
    expect(body.pointsToDistribute).toBe(5);
    expect(body.baseAttributes).toEqual({ str: 3, int: 1, agi: 1, cha: 2, luk: 0 });
    expect(body.attributes.map((attr: { id: string }) => attr.id)).toEqual([
      'str',
      'int',
      'agi',
      'cha',
      'luk',
    ]);
    expect(body.races.some((race: Record<string, unknown>) => 'attribute_bonus' in race)).toBe(
      false
    );
    expect(body.classes.some((cls: Record<string, unknown>) => 'starting_bonus' in cls)).toBe(
      false
    );
  });
});
