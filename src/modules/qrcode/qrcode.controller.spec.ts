import { Test, TestingModule } from '@nestjs/testing';
import { QrcodeController } from './qrcode.controller';
import { QrcodeService } from './qrcode.service';

describe('QrcodeController', () => {
  let controller: QrcodeController;
  const mockQrcodeService = {
    generateToken: jest.fn(),
    verifyToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QrcodeController],
      providers: [
        {
          provide: QrcodeService,
          useValue: mockQrcodeService,
        },
      ],
    }).compile();

    controller = module.get<QrcodeController>(QrcodeController);
  });

  describe('generateToken', (): void => {
    it('should return a token string', () => {
      const userId = '123';
      const req = { user: { sub: userId } } as any;
      const token = 'mocked_token';

      mockQrcodeService.generateToken.mockReturnValue(token);

      const result = controller.generateToken(req);

      expect(result).toEqual({ token });
      expect(mockQrcodeService.generateToken).toHaveBeenCalledWith(userId);
    });
  });

  describe('scanToken', () => {
    it('should return success true with userId if token is valid', () => {
      const token = 'valid_token';
      const payload = { userId: '123' };

      mockQrcodeService.verifyToken.mockReturnValue(payload);

      const result = controller.scanToken(token);

      expect(result).toEqual({ success: true, userId: payload.userId });
      expect(mockQrcodeService.verifyToken).toHaveBeenCalledWith(token);
    });

    it('should return success false with message if token is invalid', () => {
      const token = 'invalid_token';

      mockQrcodeService.verifyToken.mockReturnValue(null);

      const result = controller.scanToken(token);

      expect(result).toEqual({
        success: false,
        message: 'Token không hợp lệ hoặc đã hết hạn',
      });
      expect(mockQrcodeService.verifyToken).toHaveBeenCalledWith(token);
    });
  });
});
